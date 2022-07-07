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
        }
        // ,
        // episodes: [{
        //     number:{
        //         type: Number
        //     },
        //     title:{
        //         type: String
        //     },
        //     synopsis:{
        //         type: String
        //     },
        //     duration:{
        //         type: Number
        //     },
        //     posterUrl:{
        //         type: String
        //     },
        //     episodeUrl:{
        //         type: String
        //     }
        // }]
    }]
})

export default mongoose.model<Serie>('Serie', SerieSchema);