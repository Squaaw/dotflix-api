import mongoose from "mongoose";

interface Episode{
    _id?: mongoose.Types.ObjectId,
    number: number,
    title: string,
    synopsis: string,
    duration: number,
    posterUrl: string
}

export { Episode }