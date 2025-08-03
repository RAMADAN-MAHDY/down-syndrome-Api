import { Router } from 'express';
import { adminLogin, addContent, updateContent, deleteContent, getAllContent, addEvent, updateEvent, deleteEvent, getAllEvents } from '../controllers/adminController.js';
import { adminAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', adminLogin);
router.post('/content', adminAuth, addContent);
router.put('/content/:id', adminAuth, updateContent);
router.delete('/content/:id', adminAuth, deleteContent);
router.get('/content', adminAuth, getAllContent);
router.post('/events', adminAuth, addEvent);
router.put('/events/:id', adminAuth, updateEvent);
router.delete('/events/:id', adminAuth, deleteEvent);
router.get('/events', adminAuth, getAllEvents);

export default router;
