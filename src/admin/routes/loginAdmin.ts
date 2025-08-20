import {logInAdmin , refreshToken , dashboard , logOutAdmin} from '../controllers/loginAdmin.js';
import {Router} from 'express';
import {adminAuth} from '../../middlewares/authMiddleware.js'

const router = Router();

router.post("/logInAdmin" , logInAdmin);
router.get("/dashboard", adminAuth ,dashboard);
router.post("/refreshToken" , refreshToken);
router.post("/logOutAdmin" , logOutAdmin);
export default router ;