import combineCrimeBoundaryModel from "../models/combineCrimeBoundary.model.js";

export const getCrimeDataGroupedByCommunity = async (year) => {
  try {
    console.log("start>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const pipeline = [];

    if (year) {
      pipeline.push({ $match: { year: parseInt(year) } });
    }

    pipeline.push(
      {
        $group: {
          _id: "$community",
          totalCrimeCount: { $sum: "$crime_count" },
          cityBoundaryData: { $first: "$cityBoundaryData" },
        },
      },
      {
        $project: {
          _id: 0,
          community: "$_id",
          totalCrimeCount: 1,
          cityBoundaryData: 1,
        },
      }
    );

    console.log(pipeline);

    const result = await combineCrimeBoundaryModel.aggregate(pipeline);
    console.log("end>>>>>>>>>>>>>>>>>>>>>");
    return result;
  } catch (error) {
    throw new Error(`Error querying crime data: ${error.message}`);
  }
};
