import mongoose from "mongoose";
import { crimedata_tmp_collection_name } from "../utils/db/tableNameConst.js";
import {crimeDataTmpSchema} from "../schema/crimedataSchema.schema.js";

export default mongoose.model(
  crimedata_tmp_collection_name,
  crimeDataTmpSchema
);
