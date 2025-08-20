import { Router } from 'express';
import { getAgeGroups,createAgeGroup } from '../controllers/ageGroupController.js';

const router = Router();


router.post('/createAgeGroup', createAgeGroup);   // إنشاء فئة عمرية جديدة
router.get('/getAgeGroups', getAgeGroups);  // استرجاع جميع الفئات العمرية

export default router;
