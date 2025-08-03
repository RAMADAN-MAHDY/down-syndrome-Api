import { Router } from 'express';
import { getEvents, searchEvents, getNearbyEvents } from '../controllers/eventController.js';

const router = Router();

router.get('/', getEvents);
router.get('/search', searchEvents);
router.get('/nearby', getNearbyEvents);

export default router;
