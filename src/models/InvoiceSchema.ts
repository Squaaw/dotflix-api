import mongoose, { Schema } from "mongoose";
import { Decimal128 } from "mongodb";

import { Invoice } from "../interfaces/Invoice";

const InvoiceSchema: Schema = new Schema({
    amount:{
        type: Decimal128,
    },
    sentAt:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
    },
    chrono:{
        type: Number,
    },
    created_date:{
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model<Invoice>('Invoice', InvoiceSchema);