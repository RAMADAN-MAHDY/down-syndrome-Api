import { Router } from 'express';
import { searchForArticle, getArticleFilter } from '../controllers/articleController.js';

const router = Router();
// Define the routes for articles
router.get('/getArticle', getArticleFilter);
router.post('/search', searchForArticle);


export default router;
