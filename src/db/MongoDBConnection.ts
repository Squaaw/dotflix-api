import mongoose from "mongoose";
import { config } from "../config"

export const dbConnection = async () => {
    console.log(config.mongo.urlLocal);
    
    mongoose.connect(config.mongo.urlLocal)
    .then((result) => console.log("Db connected"))
    .catch(err => console.log(err))
}