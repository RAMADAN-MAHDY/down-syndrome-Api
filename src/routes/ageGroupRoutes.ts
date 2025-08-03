import { Router } from 'express';
import { getAgeGroups, getGuidanceContent } from '../controllers/ageGroupController.js';

const router = Router();

router.get('/', getAgeGroups);
router.get('/:ageGroupId/content', getGuidanceContent);

export default router;
