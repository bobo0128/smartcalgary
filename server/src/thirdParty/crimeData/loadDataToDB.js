import {
  connectToDatabase,
  closeDatabaseConnection,
} from "../../utils/db/dbConn.js";
import fs from "fs";
import csv from "csv-parser";
import CrimeDataTmp from "../../models/crimedata_tmp.model.js";
import { dropCollection } from "../../utils/db/collectionOperator.js";
import { crimedata_tmp_collection_name } from "../../utils/db/tableNameConst.js";

async function insertDataIntoMongoDB(filePath) {
  console.log("load csv to db:"+filePath);
  await connectToDatabase();
  await dropCollection(crimedata_tmp_collection_name);
  return new Promise((resolve, reject) => {
    const records = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => records.push(row))
      .on("end", async () => {
        try {
          await CrimeDataTmp.insertMany(records);
          console.log("Crime data inserted successfully");
          resolve(true);
        } catch (error) {
          console.error("Error inserting data into MongoDB:", error);
          resolve(false);
        } finally {
          //await closeDatabaseConnection(); // Close the connection after operation
        }
      }).on("error", (error) => {
        console.error("Error reading CSV file:", error);
        reject(error);
      });
  });
}

export { insertDataIntoMongoDB };

// async function main() {
//   try {
//     await insertDataIntoMongoDB("../crimeData/tmpFiles/crime_2024_10_27_1730073664089.csv");
//   } catch (error) {
//     console.error("Error in processing:", error);
//   }
// }

// main();
