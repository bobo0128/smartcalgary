import { Router } from 'express';
import { crimeDataGroupedByYear, crimeDataByYearAndCommunity, crimeDataGroupedByCrimeType, crimeYearlyDataGroupedByCrimeType, crimeDataGroupedByCrimeTypePieChart } from '../../controllers/crimeDataController.js';

const router = Router();
router.get("/byYear", crimeDataGroupedByYear);
router.get("/byYearAndCommunity", crimeDataByYearAndCommunity);
router.get("/byCrimeType", crimeDataGroupedByCrimeType);
router.get("/byCrimeTypeAndYear", crimeYearlyDataGroupedByCrimeType);
router.get("/byCrimeTypePie", crimeDataGroupedByCrimeTypePieChart);

export default router;