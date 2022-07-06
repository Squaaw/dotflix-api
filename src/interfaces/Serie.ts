import mongoose from "mongoose"

interface Serie extends mongoose.Document{
    _id?: number,
    title: string,
    synopsis: string,
    category: string[],
    releaseDate: Date,
    endDate: Date,
    posterUrl: string
}

export { Serie }