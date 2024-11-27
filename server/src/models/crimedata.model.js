import mongoose from "mongoose";
import { crimedata_main_collection_name } from "../utils/db/tableNameConst.js";
import {crimeDataMainSchema} from "../schema/crimedataSchema.schema.js";



export default mongoose.model(
  crimedata_main_collection_name,
  crimeDataMainSchema
);
