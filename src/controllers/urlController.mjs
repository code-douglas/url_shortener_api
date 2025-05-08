import { nanoid } from 'nanoid';
import Url from '../models/Url.mjs';

class UrlController {
  static async getUrlForShorten(req, res) {
    const { originalUrl, expireAt } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: 'URL original é obrigatória.' });
    }

    const shortCode = nanoid(8);
    let expiresAt = undefined;

    if (expireAt) {
      expiresAt = new Date(expireAt);
      
      if (isNaN(expiresAt)) {
        return res.status(400).json({ message: 'Data de expiração inválida.' });
      }
    }
    
    try {
      const url = new Url({ originalUrl, shortCode, expiresAt });
      await url.save();

      res.status(201).json({
        originalUrl,
        shortUrl: `${process.env.BASE_URL}/api/${shortCode}`,
        expiresAt: expiresAt ? expiresAt.toISOString() : null,
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
