import express from 'express';
import { adminAuth } from '../../middlewares/authMiddleware.js';
import {AddEvents} from '../../controllers/admin/Events.js';
const router = express.Router();

router.post("/AddEvents", adminAuth ,AddEvents);

export default router;