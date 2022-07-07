import mongoose from "mongoose";

interface Season{
    _id?: mongoose.Types.ObjectId,
    number: number
}

export { Season }