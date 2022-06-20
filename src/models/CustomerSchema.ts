import mongoose, { Schema } from "mongoose";
import { Customer } from "../interfaces/Customer";

const CustomerSchema: Schema = new Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    addressName:{
        type: String,
    },
    addressNumber:{
        type: Number,
    },
    postalCode:{
        type: String,
    },
    city:{
        type: String,
    }
})

export default mongoose.model<Customer>('Customer', CustomerSchema);