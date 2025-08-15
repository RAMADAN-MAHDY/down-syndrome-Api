import {logInAdmin , refreshToken} from '../controllers/loginAdmin.js';
import {Router} from 'express';

const router = Router();

router.post("/logInAdmin" , logInAdmin);
router.post("/refreshToken" , refreshToken);

export default router ;