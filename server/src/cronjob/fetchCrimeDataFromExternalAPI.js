import { importDataTask } from "../thirdParty/crimeData/importDataTasks.js";
import { createCrimeCityBoundaryCollection } from "../thirdParty/mergeData.js";
import { crimeDataSchedule } from "../utils/constants.js";
import cron from 'node-cron';

const fetchCrimeDataTask = cron.schedule(crimeDataSchedule, async() => {
    console.log('Start crime data cron job on the 28th of every month at midnight');
    try {
        await importDataTask();
        await createCrimeCityBoundaryCollection();
      } catch (error) {
        console.error("Error in fetching crime data:", error);
      } 
});


  
export default fetchCrimeDataTask;