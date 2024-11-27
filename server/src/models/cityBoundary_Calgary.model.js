import mongoose from "mongoose";
import { cityboundary_main_collection_name } from "../utils/db/tableNameConst";
import cityBoundaryMainSchema from "../schema/cityBoundary_Calgary.schema.js";

export default mongoose.model(cityboundary_main_collection_name, cityBoundaryMainSchema );
