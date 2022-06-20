import { Decimal128 } from "mongodb";
import mongoose, { Schema } from "mongoose";

import { InvoiceArchives } from "../interfaces/InvoiceArchives";

const invoiceArchiveSchema = new Schema({
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

export default mongoose.model<InvoiceArchives>('InvoiceArchive', invoiceArchiveSchema);