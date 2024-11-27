import mongoose from "mongoose";
import { combine_CrimeBoundary_Collection_name, combine_CrimeBoundary_Collection_tmp_name } from "../utils/db/tableNameConst.js";

const createCombineCrimeBoundarySchema = (collectionName) => {
  const cityBoundaryDataSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    properties: {
      comm_structure: String,
      name: String,
      sector: String,
      class_code: String,
      created_dt: Date,
      srg: String,
      class: String,
      comm_code: String,
      modified_dt: Date,
    },
    geometry: {
      type: {
        type: String,
        required: true,
      },
      coordinates: [[[Number]]],
    },
  });

  const combineCrimeBoundarySchema = new mongoose.Schema(
    {
      community: {
        type: String,
        required: true,
      },
      category: String,
      crime_count: {
        type: Number,
        required: true,
      },
      year: Number,
      month: String,
      cityBoundaryData: cityBoundaryDataSchema,
    },
    {
      collection: collectionName,
    }
  );

  combineCrimeBoundarySchema.index({ community: 1 });
  return combineCrimeBoundarySchema;
};

export const combineCrimeBoundaryTmpSchema = createCombineCrimeBoundarySchema(combine_CrimeBoundary_Collection_tmp_name);
export const combineCrimeBoundaryMainSchema = createCombineCrimeBoundarySchema(combine_CrimeBoundary_Collection_name);
