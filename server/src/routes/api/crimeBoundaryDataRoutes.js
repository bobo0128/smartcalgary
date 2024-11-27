import { Router } from 'express';
import { getCrimeData } from '../../controllers/crimeCityBoundaryController.js';

const router = Router();
router.get("/", getCrimeData);

export default router;