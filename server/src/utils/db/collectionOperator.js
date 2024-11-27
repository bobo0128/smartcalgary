import mongoose from "mongoose";
//Before calling this function, need to connect to mongoDB
//After calling this function, need to close the mongoDB connection.

export const renameCollection = async (oldName, newName) => {
  try {
    //Check if oldName collection exists, if yes, drop it
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionExists = collections.some(
      (collection) => collection.name === oldName
    );
    if (collectionExists) {
      await mongoose.connection.db.collection(oldName).rename(newName);
      console.log("Renamed collection name " + oldName + " to " + newName);
    }
  } catch (error) {
    console.error("Error in renaming collections:", error);
    throw new Error(error);
  }
};

export const dropCollection = async (collectionName) => {
  try {
    const collectionExists = await mongoose.connection.db
      .listCollections({ name: collectionName })
      .hasNext();

    if (collectionExists) {
      const result = await mongoose.connection.db.dropCollection(collectionName);
      console.log(
        `Collection "${collectionName}" dropped successfully`,
        result
      );
    } else {
      console.log("Collection does not exist " + collectionName);
    }

  } catch (error) {
    console.error("Error dropping collection " + collectionName + " : ", error);
    throw new Error(error);
  }
};

// import {
//   connectToDatabase,
//   closeDatabaseConnection,
// } from "../../utils/db/dbConn.js";

// async function main() {
//   try {
//     await connectToDatabase();
//     await renameCollection("crimedatas", "crimedata_backup");
//     await dropCollection("crimedata_tmps");
//   } catch (error) {
//     console.error("Error in processing:", error);
//   } finally {
//     await closeDatabaseConnection();
//   }
// }

// main();
