import { getContactById , getAllContacts} from '../controllers/contacuUs.js';
import {adminAuth} from '../../middlewares/authMiddleware.js'
import { Router } from 'express';

const router = Router();



// Define the route for getting all contacts
router.get('/contact-us-all', adminAuth , getAllContacts);

// Define the route for getting a contact by phone number
router.get('/contact-us/:id', adminAuth , getContactById);

export default router ;