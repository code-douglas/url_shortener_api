import express from 'express';
import UrlController from '../controllers/urlController.mjs';
const router = express.Router();

router.post('/url', UrlController.getUrlForShorten);

export default router;
