import mongoose from "mongoose";
import {combineCrimeBoundaryTmpSchema} from "../schema/combineCrimeBoundary.schema.js";
import { combine_CrimeBoundary_Collection_tmp_name } from "../utils/db/tableNameConst";

export default mongoose.model(combine_CrimeBoundary_Collection_tmp_name, combineCrimeBoundaryTmpSchema);


