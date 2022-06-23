import mongoose from "mongoose"

interface Movie extends mongoose.Document{
    _id?: number,
    title: string,
    synopsis: string,
    category: string[], // créer un objet category ? => id, name
    releaseDate: Date,
    duration: number,
    posterUrl: string
}

export { Movie }