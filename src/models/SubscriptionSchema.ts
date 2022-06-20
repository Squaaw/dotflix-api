import { Decimal128 } from "mongodb";
import mongoose, { Schema } from "mongoose";

import { Subscription } from "../interfaces/Subscription";

const SubscriptionSchema = new Schema({
    name:{
        type: String,
    },
    duration:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
    },
    price:{
        type: Number,
    },
    created_date:{
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model<Subscription>('Subscription', SubscriptionSchema);