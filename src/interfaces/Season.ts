import mongoose from "mongoose";
import { Episode } from "./Episode";

interface Season{
    _id?: mongoose.Types.ObjectId,
    number: number,
    episodes?: Episode[]
}

export { Season }