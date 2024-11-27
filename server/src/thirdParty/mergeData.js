/* After loading crimedata and boundary data to our local database, 
we will run a script to create a new collection with combine data into it.
*/

import mongoose from "mongoose";
import combineCrimeBoundaryModel from "../models/combineCrimeBoundary.model.js";
import {
  combine_CrimeBoundary_Collection_name,
  combine_CrimeBoundary_Collection_tmp_name,
  combine_CrimeBoundary_Collection_backup_name,
  cityboundary_main_collection_name,
  crimedata_main_collection_name,
} from "../utils/db/tableNameConst.js";
import { renameCollection, dropCollection } from "../utils/db/collectionOperator.js";

export const createCrimeCityBoundaryCollection = async () => {
  try {
    const db = mongoose.connection.db;

    //check if collection exists
    const collections = await db
      .listCollections({ name: combine_CrimeBoundary_Collection_name })
      .toArray();
    const collectionExists = collections.length > 0;

    if (collectionExists) {
      console.log(
        `${combine_CrimeBoundary_Collection_name} exists, clearing all documents ...`
      );
      await db.collection(combine_CrimeBoundary_Collection_name).deleteMany({});
    } else {
      console.log(
        `${combine_CrimeBoundary_Collection_name} does not exist, creating it...`
      );
      // If it does not exist, create the collection
      await combineCrimeBoundaryModel.createCollection();
    }

    await db
      .collection(crimedata_main_collection_name)
      .aggregate([
        {
          $lookup: {
            from: cityboundary_main_collection_name,
            localField: "community",
            foreignField: "properties.name",
            as: "cityBoundaryData",
          },
        },
        {
          $unwind: {
            path: "$cityBoundaryData",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $out: combine_CrimeBoundary_Collection_tmp_name,
        },
      ])
      .toArray();
    // .exec();

    console.log(
      `${combine_CrimeBoundary_Collection_tmp_name} created and indexed successfully.`
    );

    await dropCollection(combine_CrimeBoundary_Collection_backup_name);
    await renameCollection(combine_CrimeBoundary_Collection_name, combine_CrimeBoundary_Collection_backup_name);
    await renameCollection(combine_CrimeBoundary_Collection_tmp_name, combine_CrimeBoundary_Collection_name);
  } catch (error) {
    console.error("Error creating CrimeCityBoundaryCollection:", error);
  }
};


// import {
//   connectToDatabase,
//   closeDatabaseConnection,
// } from "../utils/db/dbConn.js";

// async function main() {
//   try {
//     await connectToDatabase();
//     await createCrimeCityBoundaryCollection();
//   } catch (error) {
//     console.error("Error in processing:", error);
//   } finally {
//     await closeDatabaseConnection();
//   }
// }

// main();
