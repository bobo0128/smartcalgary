import mongoose from "mongoose";
import { cityboundary_tmp_collection_name } from "../utils/db/tableNameConst.js";
import {cityBoundaryTmpSchema} from "../schema/cityBoundary_Calgary.schema.js";


export default mongoose.model(cityboundary_tmp_collection_name, cityBoundaryTmpSchema);

