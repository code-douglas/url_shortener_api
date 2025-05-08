import { nanoid } from 'nanoid';
import Url from '../models/Url.mjs';

class UrlController {
  static async getUrlForShorten(req, res) {
    const { originalUrl } = req.body; 
    if (!originalUrl) {
      return res.status(400).json({ message: 'URL original é obrigatória.' });
    }

    const shortCode = nanoid(8); 

    try {
      const url = new Url({
        originalUrl,
        shortCode,
      });

      await url.save();

      res.status(201).json({
        originalUrl,
        shortUrl: `${process.env.BASE_URL}/api/${shortCode}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao salvar a URL no banco.' });
    }
  }
}

export default UrlController;
