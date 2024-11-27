import fs from "fs";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

import { dirname } from "path";
import path from "path";
import { tmpFileFolder } from "../utils/constants.js";

export const getFileName = (dataCategory, fileType) => {
  const now = new Date();
  return (
    dataCategory +
    "_" +
    now.getFullYear() +
    "_" +
    (now.getMonth() + 1) +
    "_" +
    now.getDate() +
    "_" +
    Date.now() +
    "." + 
    fileType
  );
};


export const getCount = async (count_url) => {
  try {
    const response = await fetch(count_url);
    const data = await response.json();
    return parseInt(data[0].count, 10);
  } catch (error) {
    console.error("Error fetching record count:", error);
    throw error;
  }
};



export const downloadCSV = async (count, CSV_download_url, dataType) => {
  const url = `${CSV_download_url}${count}`;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(
    __dirname + tmpFileFolder,
    getFileName(dataType, 'csv')
  );

  try {
    console.log("download data url:"+url);
    const response = await fetch(url);
    if (!response.ok)
      throw new Error("Failed to download CSV file " + response.statusText);

    const fileStream = fs.createWriteStream(filePath);
    response.body.pipe(fileStream);

    return new Promise((resolve, reject) => {
      fileStream.on("finish", () => resolve(filePath));
      fileStream.on("error", (error) => reject(error));
    });
  } catch (error) {
    console.error("Error downloading CSV:", error);
    throw error;
  }
};



export const downloadGeojson = async(download_url, dataType) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(
    __dirname + tmpFileFolder,
    getFileName(dataType, 'geojson')
  );

  try {
      console.log("download geojson url:"+download_url);
      const response = await fetch(download_url);
      if (!response.ok)
        throw new Error("Failed to download geojson file " + response.statusText);
  
      const fileStream = fs.createWriteStream(filePath);
      response.body.pipe(fileStream);
  
      return new Promise((resolve, reject) => {
        fileStream.on("finish", () => resolve(filePath));
        fileStream.on("error", (error) => reject(error));
      });
    } catch (error) {
      console.error("Error downloading CSV:", error);
      throw error;
    }

}


// async function main() {
//   try {
//     const filename = getCSVFileName('crimeData');
//     console.log(`Filename: ${filename}`);
//   } catch (error) {
//     console.error("Error in processing:", error);
//   }
// }

// main();



