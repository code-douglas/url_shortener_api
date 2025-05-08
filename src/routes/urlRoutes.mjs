import express from 'express';
import UrlController from '../controllers/urlController.mjs';
const router = express.Router();

router.post('/url', UrlController.getUrlForShorten);
router.get('/:shortCode', UrlController.redirectToOriginal);

export default router;
