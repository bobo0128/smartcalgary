import { getBoundaryDataFromAPI } from "./getBoundaryDataFromAPI.js";
import { insertGeoJSONData } from "./loadBoundaryDataToDB.js";
import { renameCollection, dropCollection } from "../../utils/db/collectionOperator.js";
import fs from "fs";
import { cityboundary_backup_coolection_name, cityboundary_main_collection_name, cityboundary_tmp_collection_name } from "../../utils/db/tableNameConst.js";

export const importBoundaryDataTask = async () => {
  try {
    const tmpGeonJsonPath = await getBoundaryDataFromAPI();

    if (tmpGeonJsonPath) {
        const ifComplete = await insertGeoJSONData(tmpGeonJsonPath);
      if (ifComplete) {
        //drop backup if it exists
        await dropCollection(cityboundary_backup_coolection_name);
        //rename current main collection to backup
        await renameCollection(cityboundary_main_collection_name, cityboundary_backup_coolection_name);
        //rename tmp to main
        await renameCollection(cityboundary_tmp_collection_name, cityboundary_main_collection_name);
        //delete the tmp collection
        await dropCollection(cityboundary_tmp_collection_name);
      }

      //delete downloaded CSV file
      fs.unlink(tmpGeonJsonPath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          return;
        }
        console.log(`File deleted successfully: ${tmpGeonJsonPath}`);
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default importBoundaryDataTask;



// async function main() {
//     try {
//       await importBoundaryDataTask();
//     } catch (error) {
//       console.error("Error in processing:", error);
//     } 
//   }
  
//   main();
