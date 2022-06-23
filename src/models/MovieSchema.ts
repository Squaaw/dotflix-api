import mongoose, { Schema } from "mongoose";
import { Movie } from "../interfaces/Movie";

const MovieSchema: Schema = new Schema({
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
    duration:{
        type: Number
    },
    posterUrl:{
        type: String
    }
})

export default mongoose.model<Movie>('Movie', MovieSchema);