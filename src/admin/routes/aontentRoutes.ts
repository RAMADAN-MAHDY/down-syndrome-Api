import {Router} from 'express';
import { addContent, DeleteContent ,EditContent } from '../controllers/ContentController.js';
import { adminAuth } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post('/content', adminAuth, addContent);
router.patch('/content-Edit/:id', adminAuth, EditContent);
router.delete('/content-Delete/:id', adminAuth, DeleteContent);


export default router;
