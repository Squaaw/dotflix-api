import mongoose, { Schema } from "mongoose";
import { UserTicket } from "../interfaces/UserTicket";

const UserTicketSchema: Schema = new Schema({
    message:{
        type: String,
    },
    sentAt:{
        type: String,
    },
    status:{
        type: String,
    }
})

export default mongoose.model<UserTicket>('UserTicket', UserTicketSchema);