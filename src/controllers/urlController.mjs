import { nanoid } from 'nanoid';
import Url from '../models/Url.mjs';

class UrlController {
  static async getUrlForShorten(req, res) {
    const { originalUrl, expiresIn } = req.body;
  
    if (!originalUrl) {
      return res.status(400).json({ message: 'URL original é obrigatória.' });
    }
  
    const shortCode = nanoid(8);
    let expiresAt = undefined;
  
    if (expiresIn) {
      const now = new Date();
      expiresAt = new Date(now.getTime() + expiresIn * 1000);
    }
  
    try {
      const url = new Url({ originalUrl, shortCode, expiresAt });
      await url.save();
  
      res.status(201).json({
        originalUrl,
        shortUrl: `${process.env.BASE_URL}/api/${shortCode}`,
        expiresAt: expiresAt || null,
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao salvar a URL.' });
    }
  }

  static async redirectToOriginal(req, res) {
    const { shortCode } = req.params;

    try {
      const url = await Url.findOne({ shortCode });

      if (!url) {
        return res.status(404).json({ message: 'URL não encontrada.' });
      }

      if (url.expiresAt && url.expiresAt < new Date()) {
        return res.status(410).json({ message: 'URL expirada.' });
      }

      res.redirect(url.originalUrl);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao redirecionar.' });
    }
  }
}

export default UrlController;
