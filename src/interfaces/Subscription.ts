import mongoose from "mongoose"

interface Subscription extends mongoose.Document{
    customerId?: Number,
    name: String,
    duration: Number,
    status: String,
    price: Number,
    createdAt: Date
}

export { Subscription }