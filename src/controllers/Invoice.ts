import { NextFunction, Request, Response } from "express"
import { Invoice } from "../interfaces/Invoice"
import invoiceArchiveSchema from "../models/InvoiceArchiveSchema"
import InvoiceSchema from "../models/InvoiceSchema"

const addNewInvoice = (req: Request, res: Response, next: NextFunction) => {
    let newInvoice = new InvoiceSchema({
        "amount": req.body.amount,
        "sentAt": req.body.sentAt,
        "status": req.body.status,
        "chrono": req.body.chrono
    })
    
    return newInvoice
        .save()
        .then((data: Invoice) => res.status(201).json({data}))
        .catch((error: any) => res.status(500).json({ error }));
}

const getAllInvoices = (req: Request, res: Response, next: NextFunction) => {
    return InvoiceSchema
    .find()
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(500).json({ err }));
}

const getInvoiceByChrono = (req: Request, res: Response, next: NextFunction) => {
    const InvoiceChrono = req.params.chrono;

    return InvoiceSchema
        .find({chrono:req.params.InvoiceChrono})
        .then((data) => (data ? res.status(200).json({ data }) : res.status(404).json({ message: 'Invoice not found' })))
        .catch((err) => res.status(500).json({ err }));
}

const updateInvoiceByChrono = (req: Request, res: Response, next: NextFunction) => {
    let lastChronoFinded: number = 0;
    return InvoiceSchema.findOne().sort('-chrono').then((data) => {
        
        lastChronoFinded = data.chrono + 1;
        
        InvoiceSchema.findOneAndUpdate({chrono:req.params.chrono},{chrono: lastChronoFinded, amount: req.body.amount, sentAt: req.body.sentAt, status: req.body.status}, {new:true, useFindAndModify:false})
        .then((data: any) => res.status(200).json({ data }))
        .catch((err: any) => res.status(500).json({ err }));  
    })
}

const deleteInvoiceByChrono = (req: Request, res: Response, next: NextFunction) => {

    InvoiceSchema.find({chrono:req.params.chrono}).then((data)=> {
        let newInvoiceArchive = new invoiceArchiveSchema({amount: data[0].amount, sentAt: data[0].sentAt, status: data[0].status, chrono: data[0].chrono})
        newInvoiceArchive.save()
    }).then(() => {
        InvoiceSchema.remove({chrono:req.params.chrono})
        .then((data: any) => res.status(201).json({ data }))
        .catch((err: any) => res.status(500).json({ err }));
    }).catch(err => {
        res.json({err: err, message: "An error was occured, retry in a few moment."})
    })
}

export { addNewInvoice, getAllInvoices, getInvoiceByChrono, updateInvoiceByChrono, deleteInvoiceByChrono };