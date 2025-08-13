import { Router } from 'express';
import { GetEvents} from '../controllers/Events.js';

const router = Router();

router.get('/GetEvents', GetEvents);

export default router;
