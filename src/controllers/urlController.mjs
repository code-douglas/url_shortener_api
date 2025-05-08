import { nanoid } from 'nanoid';
import Url from '../models/Url.mjs';

class UrlController {
  static async getUrlForShorten(req, res) {
    const { originalUrl, expiresAt } = req.body;

    // Verificando se a URL original foi fornecida
    if (!originalUrl) {
      return res.status(400).json({ message: 'URL original é obrigatória.' });
    }

    // Gerando o código curto com nanoid
    const shortCode = nanoid(8);
    let expiresAtDate = undefined;

    // Se a data de expiração for fornecida, processa ela
    if (expiresAt) {
      // Verifica se a data de expiração é válida
      expiresAtDate = new Date(expiresAt);
      if (isNaN(expiresAtDate)) {
        return res.status(400).json({ message: 'Data de expiração inválida.' });
      }
    }

    try {
      // Criação do objeto de URL no banco de dados
      const url = new Url({
        originalUrl,
        shortCode,
        expiresAt: expiresAtDate || null, // Se expiresAt não for fornecido, fica null
      });

      // Salvando no banco de dados
      await url.save();

      // Retornando resposta com URL encurtada
      res.status(201).json({
        originalUrl,
        shortUrl: `${process.env.BASE_URL}/api/${shortCode}`,
        expiresAt: expiresAtDate ? expiresAtDate.toISOString() : null, // Retornando a data no formato ISO
      });
    } catch (error) {
      // Tratamento de erros
      console.error(error);
      res.status(500).json({ message: 'Erro ao salvar a URL.' });
    }
  }
}

export default UrlController;
