/*
In this file,
1. Get crime data from Calgary open source API.
2. Load crime data to mongoDB tmp collection : crimedata_tmps
3. Rename current crimedata collection to crimedata_backup (if collection crimedata exists) 
4. Rename crimedata_tmps to crimedata (crimedata is the main collection for frontend searching)
5. Delete tmp csv file.

There will be a short moment crimedata collection is not available. (After it is renamed to crimedata_backup, and before renaming crimedata_tmps to crimedata).
Options: 
1. Before searching, check if crimedata exists. if not, wait 1 sec. 
2. If searching from crimedata failed, we can search from open source API directly.
*/

import { getCrimeDataFromAPI } from "./getCrimeDataFromAPI.js";
import { insertDataIntoMongoDB } from "./loadDataToDB.js";
import { renameCollection, dropCollection } from "../../utils/db/collectionOperator.js";
import fs from "fs";
import { crimedata_backup_coolection_name, crimedata_main_collection_name, crimedata_tmp_collection_name } from "../../utils/db/tableNameConst.js";

export const importDataTask = async () => {
  try {
    const tmpCSVPath = await getCrimeDataFromAPI();

    if (tmpCSVPath) {
      //load data to crimedata_tmps collection
      if (await insertDataIntoMongoDB(tmpCSVPath)) {
        //drop crimedata_backup if it exists
        await dropCollection(crimedata_backup_coolection_name);
        //rename current crimedata collection to crimedata_backup
        await renameCollection(crimedata_main_collection_name, crimedata_backup_coolection_name);
        //rename crimedata_tmps to crimedata as main collection
        await renameCollection(crimedata_tmp_collection_name, crimedata_main_collection_name);
        //delete the collection crimedata_tmps
        await dropCollection(crimedata_tmp_collection_name);
      }

      //delete downloaded CSV file
      fs.unlink(tmpCSVPath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          return;
        }
        console.log(`File deleted successfully: ${tmpCSVPath}`);
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};



// async function main() {
//     try {
//       await importDataTask();
//     } catch (error) {
//       console.error("Error in processing:", error);
//     } finally{
//       await closeDatabaseConnection();
//     }
//   }
  
//   main();
