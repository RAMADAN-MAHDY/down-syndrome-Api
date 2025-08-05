import { Router } from 'express';
import { getContentFilter, } from '../controllers/contentController.js';

const router = Router();

router.get('/content/filter', getContentFilter);



// router.get('/search', searchArticles);
// router.get('/topics', getArticleTopics);

export default router;
