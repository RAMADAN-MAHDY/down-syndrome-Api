import {Router} from 'express';
import {AddArticle} from '../controllers/articleController.js';
import {adminAuth} from '../../middlewares/authMiddleware.js'
import upload from '../../middlewares/multerSetup.js';
const router = Router();

// add articles 
router.post('/article' ,adminAuth ,upload.single('image') , AddArticle);

export default router;