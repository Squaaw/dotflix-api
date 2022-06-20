import mongoose from "mongoose";
import { config } from "../config"

export const dbConnection = async () => {
    console.log(config.mongo.url);
    
    mongoose.connect(config.mongo.url)
    .then((result) => console.log("Db connected"))
    .catch(err => console.log(err))
}