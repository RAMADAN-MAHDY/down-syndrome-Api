import { Router } from 'express';
import { getContentFilter, searchArticles, getArticleTopics } from '../controllers/articleController.js';

const router = Router();

router.get('/getContentFilter', getContentFilter);







// router.get('/search', searchArticles);
// router.get('/topics', getArticleTopics);

export default router;
