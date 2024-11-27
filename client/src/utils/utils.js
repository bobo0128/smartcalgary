import { defaultColor, mapColorObjYearly } from "./constants.js";

export const getRandomNumber = () => {
  return Math.floor(Math.random() * 201); // 201 to include 200
};

export const getUniqueID = (item) => {
  const communityName = item.name || "unknownCommunity";
  // Create a unique ID by concatenating properties
  const uniqueID =
    communityName.replace(/\s+/g, "-") +
    "-" +
    Date.now() +
    "-" +
    Math.floor(Math.random() * 100);
  // console.log("uniqueID============"+uniqueID);
  return uniqueID;
};

export const getCrimeRateColor = (crimeRate, mapColorObj) => {
  for (const colorObj of mapColorObj) {
    if (Array.isArray(colorObj.range)) {
      const [min, max] = colorObj.range;
      if (crimeRate >= min && crimeRate < max) {
        return colorObj.color;
      }
    } else if (crimeRate > colorObj.range) {
      return colorObj.color;
    }
  }
  return defaultColor;
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const generateDynamicColorObj = async (numOfYear) => {
  return mapColorObjYearly.map(({ range, color }) => {
    const newRange = range[1]
      ? [range[0] * numOfYear, range[1] * numOfYear]
      : [range[0] * numOfYear]; // Scale range by years
    return {
      range: newRange,
      color,
      label: newRange[1]
        ? `${newRange[0]} ≤ Crime Number < ${newRange[1]}`
        : `${newRange[0]} ≤ Crime Number`,
    };
  });
};

export const calculateYearsFrom2018 = () => {
  const currentYear = new Date().getFullYear(); // Get the current year
  return currentYear - 2018 + 1; // Include 2018 as part of the range
};

export const getFirstFewWords = (content, count) => {
  // Split the content into words
  const words = content.split(/\s+/); // Split by any whitespace (spaces, tabs, newlines)

  // Get the first count words, or all if less than 200
  const first200Words = words.slice(0, count).join(" ");

  // Append "..." if there are more than count words
  return words.length > count ? first200Words + "..." : first200Words;
};

//"Mon, 25 Nov 2024 15:21:43 -0700"
export const convertDateToLocalStr = (dateStr) => {
  const date = new Date(dateStr);

  // Convert the date to the local browser timezone
  return date.toLocaleString();
};
