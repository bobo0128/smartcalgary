import fs from "fs";

export const deleteTmpFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file" + filePath, err);
      return;
    }
    console.log("File deleted successfully " + filePath);
  });
};

async function main() {
  try {
    deleteTmpFile("../thirdParty/tmpFiles/crime_2024_9_5_1729888100948.csv");
  } catch (error) {
    console.error("Error in deleting file:", error);
  }
}

main();
