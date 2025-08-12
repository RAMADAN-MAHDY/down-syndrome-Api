import {createContactUs , getContactById , getAllContacts} from '../controllers/contactUS.js';
import { Router } from 'express';

const router = Router();

// Define the route for creating a contact us entry
router.post('/contact-us', createContactUs);

// Define the route for getting all contacts
router.get('/contact-us-all', getAllContacts);

// Define the route for getting a contact by phone number
router.get('/contact-us/:id', getContactById);


// Export the router
export default router;