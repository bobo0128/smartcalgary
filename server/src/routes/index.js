import { Router } from 'express';
import crimeBoundaryRoute from './api/crimeBoundaryDataRoutes.js';
import crimeDataRoute from './api/crimeDataRoutes.js';

const router = Router();


router.use('/api/crimeboundarydata', crimeBoundaryRoute);
router.use('/api/crimedata', crimeDataRoute);

export default router;