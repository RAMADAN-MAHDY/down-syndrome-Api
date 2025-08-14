import {createContactUs } from '../controllers/contactUS.js';
import { Router } from 'express';

const router = Router();

// Define the route for creating a contact us entry
router.post('/contact-us', createContactUs);




// Export the router
export default router;