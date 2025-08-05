import {Router} from 'express';
import { adminLogin, updateContent, deleteContent, addContent, addEvent, updateEvent, deleteEvent, getAllEvents } from '../../controllers/admin/ContentController.js';
import { adminAuth } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post('/content', adminAuth, addContent);
// router.post('/login', adminLogin);
// router.put('/content/:id', adminAuth, updateContent);
// router.delete('/content/:id', adminAuth, deleteContent);
// router.post('/events', adminAuth, addEvent);
// router.put('/events/:id', adminAuth, updateEvent);
// router.delete('/events/:id', adminAuth, deleteEvent);
// router.get('/events', adminAuth, getAllEvents);

export default router;
