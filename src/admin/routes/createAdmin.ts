import {CreateAdmin} from '../controllers/createAdmin.js';
import {Router} from 'express';

const router = Router();

router.post("/CreateAdmin" , CreateAdmin);

export default router ;