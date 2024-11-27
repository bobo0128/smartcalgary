import mongoose from "mongoose";
import CrimeDataModel from "../models/crimedata.model.js";


//get crime data by community, group by year.
export const getDataGroupedByYear = async (community) => {
  try {
    const result = await CrimeDataModel.aggregate([
      { $match: { community: community } },
      {
        $group: {
          _id: "$year",
          totalCrimeCount: { $sum: "$crime_count" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return result;
  } catch (error) {
    console.error("Error fetching crime data grouped by year:", error);
    throw error;
  }
};

//get crime data by community, group by crime type.
export const getDataGroupedByCategory = async (community) => {
  try {
    const result = await CrimeDataModel.aggregate([
      { $match: { community: community } },
      {
        $group: {
          _id: "$category",
          totalCrimeCount: { $sum: "$crime_count" },
        },
      },
      { $sort: { totalCrimeCount: -1 } },
    ]);

    return result;
  } catch (error) {
    console.error("Error fetching crime data grouped by category:", error);
    throw error;
  }
};

//get crime data by community and year, group by crime type.
export const getYearlyDataGroupedByCategory = async (community, year) => {
  try {
    const result = await CrimeDataModel.aggregate([
      { $match: { community: community, year: parseInt(year) } },
      {
        $group: {
          _id: "$category",
          totalCrimeCount: { $sum: "$crime_count" },
        },
      },
      { $sort: { totalCrimeCount: -1 } },
    ]);

    return result;
  } catch (error) {
    console.error("Error fetching crime data grouped by category:", error);
    throw error;
  }
};

//get crime data by community and year, group by month
export const getDataByCommunityAndYear = async (community, year) => {
  try {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const result = await CrimeDataModel.aggregate([
      { $match: { community: community, year: parseInt(year) }},
      {
        $group: {
          _id: "$month",
          totalCrimeCount: { $sum: "$crime_count" },
        },
      },
      {
        $addFields: {
          numericId: {$toInt: "$_id"}
        }
      },
      {
        $facet: {
          actualData: [{ $project: { _id: 1, totalCrimeCount: 1, numericId: 1 } }],
          allMonths: [
            {
              $project: {
                _id: 0,
                data: {
                  $map: {
                    input: months,
                    as: "month",
                    in: {
                      _id: { $toString: "$$month" },
                      totalCrimeCount: 0,
                      numericId: "$$month",
                    },
                  },
                },
              },
            },
            { $unwind: "$data" },
            { $replaceRoot: { newRoot: "$data" } },
          ]
        }
      },
      {
        $project: {
          combined: {
            $concatArrays: ["$actualData", "$allMonths"],
          },
        },
      },
      { $unwind: "$combined"},
      {
        $replaceRoot: { newRoot: "$combined"}
      },
      {
        $group: {
          _id: "$_id",
          totalCrimeCount: { $max: "$totalCrimeCount" }, // Pick the actual value when it exists
          numericId: { $first: "$numericId" },
        },
      },
      { $sort: { numericId: 1 } },
    ]);

    return result;
  } catch (error) {
    console.error("Error fetching data by getDataByCommunityAndYear:", error);
    throw error;
  }
}

/* Created by Isha starts */
/* CCS-28 Get Crime data group by crime type with Parameters Year & Community Name*/
export const getDataGroupedByCrimeType = async (community, year) => {
  try {    
     const matchCriteria = {
      community: community,
      year: parseInt(year),
    };

    console.log("CommunityName:" + community + " Year: " + year);
    const result = await CrimeDataModel.aggregate([
      {
        $match: { community: community,
          year: parseInt(year), },
      },
      {
        $group: {
          _id: "$category",
          totalCrimeCount: { $sum: "$crime_count" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    //console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching crime data grouped by crime type for selected year & communityname:", error);
    throw error;
  }
};

/* CCS-45 Get Crime data group by crime type & Month with Parameters Year & Community Name*/
export const getDataGroupedByCrimeTypeAndMonth = async (community, year) => {
  try {
    const matchCriteria = {
      community: community,
      year: parseInt(year),
    };

    console.log("CommunityName:" + community + " Year: " + year);
    const result = await CrimeDataModel.aggregate([
      {
        /* Filters documents by community and year. */
        $match: { 
          community: community,
          year: parseInt(year)
        },
      },
      {
        /* Extracts the month from the date field, so we can group by month.*/
        $project: {
          category: 1,
          crime_count: 1,
          month: { $month: "$date" } // Extract month from date
        }
      },
      {
        /* Groups by both category and month, summing up crime_count. */
        $group: {
          _id: { category: "$category", month: "$month" },
          totalCrimeCount: { $sum: "$crime_count" },
        },
      },
      {
        /* Sorts by category and month for ordered results.*/ 
        $sort: { "_id.category": 1, "_id.month": 1 } // Sort by category and then by month
      }
    ]);

    return result;
  } catch (error) {
    console.error("Error fetching crime data grouped by crime type and month for selected year & community:", error);
    throw error;
  }
};

/* Created by Isha Ends */
