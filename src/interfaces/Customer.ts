import mongoose from "mongoose"

interface Customer extends mongoose.Document{
    userId?: Number,
    invoiceId?: Number,
    _id?: Number,
    firstName: String,
    lastName: String,
    adressName: String,
    adressNumber: Number,
    postalCode: String,
    city: String
}

export { Customer }