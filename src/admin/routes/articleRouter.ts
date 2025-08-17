import {Router} from 'express';
import {AddArticle , EditArticle , DeleteArticle} from '../controllers/articleController.js';
import {adminAuth} from '../../middlewares/authMiddleware.js'
import upload from '../../middlewares/multerSetup.js';
const router = Router();

// add articles 
router.post('/article' ,adminAuth ,upload.single('image') , AddArticle);
router.patch('/EditArticle/:id' ,adminAuth ,upload.single('image') , EditArticle);
router.delete('/DeleteArticle/:id' ,adminAuth , DeleteArticle);

export default router;