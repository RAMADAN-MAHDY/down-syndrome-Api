import express from 'express';
import {AddEvents} from '../../controllers/admin/Events.js';
const router = express.Router();

router.post("/AddEvents", AddEvents);

export default router;