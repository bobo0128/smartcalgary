import { connectToDatabase } from "../../utils/db/dbConn.js";
import { dropCollection } from "../../utils/db/collectionOperator.js";
import fs from "fs";
import { cityboundary_tmp_collection_name } from "../../utils/db/tableNameConst.js";
import CityBoundary from "../../models/cityBoundary_Calgary_tmp.model.js";

const insertGeoJSONData = async (filePath) => {
  console.log("load geojson file to db:" + filePath);
  await connectToDatabase();
  await dropCollection(cityboundary_tmp_collection_name);
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const geojson = JSON.parse(data);
    if (
      geojson.type === "FeatureCollection" &&
      Array.isArray(geojson.features)
    ) {
      const features = geojson.features;
      await CityBoundary.insertMany(features);
      console.log("GeoJSON data inserted successfully");
    } else {
      console.error("Invalid GeoJSON format");
    }

    return true;
  } catch (error) {
    console.error("Error inserting GeoJSON data:", error);
    return false;
  }
};

export { insertGeoJSONData };

// async function main() {
//   try {
//     await insertGeoJSONData(
//       "../tmpFiles/boundary_2024_10_30_1730317963818.geojson"
//     );
//   } catch (error) {
//     console.error("Error in processing:", error);
//   }
// }

// main();
