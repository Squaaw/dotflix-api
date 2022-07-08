import mongoose, { Schema } from "mongoose";
import { Serie } from "../interfaces/Serie";

const SerieSchema: Schema = new Schema({
    title:{
        type: String,
        required: true
    },
    synopsis:{
        type: String,
        required: true
    },
    category:{
        type: [String],
        required: true
    },
    releaseDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date
    },
    posterUrl:{
        type: String,
        required: true
    },
    seasons:[{
        _id:{
            type: mongoose.Types.ObjectId,
            required: true
        },
        number:{
            type: Number,
            required: true
        },
        episodes: [{
            _id:{
                type: mongoose.Types.ObjectId,
                required: true
            },
            number:{
                type: Number,
                required: true
            },
            title:{
                type: String,
                required: true
            },
            synopsis:{
                type: String,
                required: true
            },
            duration:{
                type: Number,
                required: true
            },
            posterUrl:{
                type: String,
                required: true
            }
        }]
    }]
})

export default mongoose.model<Serie>('Serie', SerieSchema);