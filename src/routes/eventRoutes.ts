import { Router } from 'express';
import { GetEvents , EventSearch} from '../controllers/Events.js';

const router = Router();

router.get('/GetEvents', GetEvents);
router.get('/EventSearch', EventSearch);

export default router;
