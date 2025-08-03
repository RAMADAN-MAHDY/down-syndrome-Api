import { Router } from 'express';
import { getArticles, searchArticles, getArticleTopics } from '../controllers/articleController.js';

const router = Router();

router.get('/', getArticles);
router.get('/search', searchArticles);
router.get('/topics', getArticleTopics);

export default router;
