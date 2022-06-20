import mongoose from "mongoose"

interface Invoice extends mongoose.Document{
    customerId?: Number,
    amount: Number,
    sentAt: Date,
    status: String,
    chrono: number
}

export { Invoice }