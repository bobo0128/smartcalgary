import importBoundaryDataTask from "../thirdParty/cityBoundary/importBoundaryDataTasks.js";
import { boundaryDataSchedule } from "../utils/constants.js";
import cron from 'node-cron';

const fetchBoundaryDataTask = cron.schedule(boundaryDataSchedule, () => {
    console.log('Start boundary data cron job on the 28th of every month at midnight');
    try {
        importBoundaryDataTask();
      } catch (error) {
        console.error("Error in fetching boundary data:", error);
      } 
});

  
export default fetchBoundaryDataTask;