import mongoose from "mongoose";
import {combineCrimeBoundaryMainSchema} from "../schema/combineCrimeBoundary.schema.js";
import { combine_CrimeBoundary_Collection_name } from "../utils/db/tableNameConst.js";

export default mongoose.model(combine_CrimeBoundary_Collection_name, combineCrimeBoundaryMainSchema);


