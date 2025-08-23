import { getAllCounts } from '../controllers/countsOfAllCollection.js';
import { adminAuth } from '../../middlewares/authMiddleware.js';

import { Router } from 'express'

const router = Router();

router.get('/getCounts', adminAuth, getAllCounts)

export default router;