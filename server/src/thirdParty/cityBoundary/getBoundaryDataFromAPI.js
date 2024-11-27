import {
    boundaryDataGeoURL,
    dataCategory,
  } from "../../utils/constants.js";

import { downloadGeojson } from "../util.js";
  
 
  export const getBoundaryDataFromAPI = async () => {
    try {
      const filePath = await downloadGeojson(boundaryDataGeoURL, dataCategory.BOUNDARYDATA);
      console.log(`Geojson file downloaded to ${filePath}`);
      return filePath;
    } catch (error) {
      console.error("Error in processing:", error);
    }
  };

  