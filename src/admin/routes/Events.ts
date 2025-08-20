import express from 'express';
import { adminAuth } from '../../middlewares/authMiddleware.js';
import {AddEvents , EditEvents , DeleteEvent} from '../controllers/Events.js';
const router = express.Router();

router.post("/AddEvents", adminAuth ,AddEvents);
router.patch("/EditEvents/:id", adminAuth ,EditEvents);
router.delete("/DeleteEvent/:id", adminAuth ,DeleteEvent);

export default router;