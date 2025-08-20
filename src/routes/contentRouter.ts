import { Router } from 'express';
import { getContentFilter, } from '../controllers/contentController.js';

const router = Router();

router.get('/content/filter', getContentFilter);

export default router;
