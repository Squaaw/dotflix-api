import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import UserTicketSchema from "../models/UserTicketSchema"
import { UserTicket } from "../interfaces/UserTicket"


const addNewUserTicket = (req: Request, res: Response, next: NextFunction) => {
    let newUserTicket = new UserTicketSchema({
        "message": req.body.message,
        "sentAt": req.body.sentAt,
        "status": req.body.status
    })
    
    return newUserTicket
    .save()
    .then((data: UserTicket) => res.status(201).json({data}))
    .catch((error: any) => res.status(500).json({ error }));
}

const getAllUserTickets = (req: Request, res: Response, next: NextFunction) => {
    return UserTicketSchema
    .find()
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(500).json({ err }));
}

const getUserTicketById = (req: Request, res: Response, next: NextFunction) => {
    const UserTicketId = req.params.id;

    return UserTicketSchema
        .find({_id:req.params.UserTicketId})
        .then((data) => (data ? res.status(200).json({ data }) : res.status(404).json({ message: 'User Ticket not found' })))
        .catch((err) => res.status(500).json({ err }));
}

const updateUserTicketById = (req: Request, res: Response) => {
    const UserTicketId = req.params.id;

    return UserTicketSchema.findById(UserTicketId)
        .then((data) => {
            if (data) {
                data.set(req.body);

                return data
                    .save()
                    .then((data: any) => res.status(200).json({ data }))
                    .catch((err: any) => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'User Ticket not found' });
            }
        })
        .catch((err) => res.status(500).json({ err }));
};

const deleteUserTicketById = (req: Request, res: Response, next: NextFunction) => {

    UserTicketSchema.find({chrono:req.params.chrono}).then((data)=> {
        let newUserTicket = new UserTicketSchema(data)
        newUserTicket.save()
    }).then(() => {
        UserTicketSchema.remove({chrono:req.params.id})
        .then((data: any) => res.status(201).json({ data }))
        .catch((err: any) => res.status(500).json({ err }));
    }).catch(err => {
        res.json({err: err, message: "An error was occured, retry in a few moment."})
    })
}

export { addNewUserTicket, getAllUserTickets, getUserTicketById, updateUserTicketById, deleteUserTicketById };