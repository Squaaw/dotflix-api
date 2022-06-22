import mongoose from "mongoose"

interface UserTicket extends mongoose.Document{
    userId?: Number,
    message: String,
    sentAt: Date,
    status: String
}

export { UserTicket }