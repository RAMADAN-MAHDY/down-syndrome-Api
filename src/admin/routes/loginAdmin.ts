import {logInAdmin , refreshToken , dashboard} from '../controllers/loginAdmin.js';
import {Router} from 'express';
import {adminAuth} from '../../middlewares/authMiddleware.js'

const router = Router();

router.post("/logInAdmin" , logInAdmin);
router.post("/refreshToken" , refreshToken);
router.get("/dashboard", dashboard);
export default router ;