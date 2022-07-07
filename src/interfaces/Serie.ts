import mongoose from "mongoose"
import { Season } from "./Season"

interface Serie extends mongoose.Document{
    _id?: mongoose.Types.ObjectId,
    title: string,
    synopsis: string,
    category: string[],
    releaseDate: Date,
    endDate: Date,
    posterUrl: string,
    seasons: Season[]
}

export { Serie }