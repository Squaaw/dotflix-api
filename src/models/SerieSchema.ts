import mongoose, { Schema } from "mongoose";
import { Serie } from "../interfaces/Serie";

const SerieSchema: Schema = new Schema({
    title:{
        type: String
    },
    synopsis:{
        type: String
    },
    category:{
        type: [String]
    },
    releaseDate:{
        type: Date
    },
    endDate:{
        type: Date
    },
    posterUrl:{
        type: String
    }
})

export default mongoose.model<Serie>('Serie', SerieSchema);