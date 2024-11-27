import mongoose from "mongoose";
import { cityboundary_main_collection_name, cityboundary_tmp_collection_name } from "../utils/db/tableNameConst.js";

const createCityBoundarySchema = (collectionName) => {
  const cityBoundarySchema = new mongoose.Schema(
    {
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
          type: String, // 'MultiPolygon' in your data
          enum: ["MultiPolygon"],
          required: true,
        },
        coordinates: {
          type: [[[Array]]], // Array of arrays of arrays of numbers
          required: true,
        },
      },
    },
    { collection: collectionName }
  );

  cityBoundarySchema.index({ name: 1 });

  return cityBoundarySchema;
};

export const cityBoundaryMainSchema = createCityBoundarySchema(cityboundary_main_collection_name);
export const cityBoundaryTmpSchema = createCityBoundarySchema(cityboundary_tmp_collection_name);
