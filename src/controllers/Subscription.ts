import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import SubscriptionSchema from "../models/SubscriptionSchema"
import { Subscription } from "../interfaces/Subscription"


const addNewSubscription = (req: Request, res: Response, next: NextFunction) => {
    let newSubscription = new SubscriptionSchema({
        "name": req.body.name,
        "duration": req.body.duration,
        "status": req.body.status,
        "price": req.body.price,
        "createdAt": req.body.createdAt
    })
    
    return newSubscription
    .save()
    .then((data: Subscription) => res.status(201).json({data}))
    .catch((error: any) => res.status(500).json({ error }));
}

const getAllSubscriptions = (req: Request, res: Response, next: NextFunction) => {
    return SubscriptionSchema
    .find()
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(500).json({ err }));
}

const getSubscriptionById = (req: Request, res: Response, next: NextFunction) => {
    const InvoiceChrono = req.params.chrono;

    return SubscriptionSchema
        .find({chrono:req.params.InvoiceChrono})
        .then((data) => (data ? res.status(200).json({ data }) : res.status(404).json({ message: 'Subscription not found' })))
        .catch((err) => res.status(500).json({ err }));
}

const updateSubscriptionById = (req: Request, res: Response) => {
    const subscriptionId = req.params.id;

    return SubscriptionSchema.findById(subscriptionId)
        .then((data) => {
            if (data) {
                data.set(req.body);

                return data
                    .save()
                    .then((data: any) => res.status(200).json({ data }))
                    .catch((err: any) => res.status(500).json({ err }));
            } else {
                return res.status(404).json({ message: 'Subscription not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteSubscriptionById = (req: Request, res: Response, next: NextFunction) => {

    SubscriptionSchema.find({chrono:req.params.chrono}).then((data)=> {
        let newInvoiceArchive = new SubscriptionSchema(data)
        newInvoiceArchive.save()
    }).then(() => {
        SubscriptionSchema.remove({chrono:req.params.chrono})
        .then((data: any) => res.status(201).json({ data }))
        .catch((err: any) => res.status(500).json({ err }));
    }).catch(err => {
        res.json({err: err, message: "An error was occured, retry in a few moment."})
    })
}

export { addNewSubscription, getAllSubscriptions, getSubscriptionById, updateSubscriptionById, deleteSubscriptionById };