import { addNewInvoice, getAllInvoices, getInvoiceByChrono, updateInvoiceByChrono, deleteInvoiceByChrono } from '../controllers/Invoice.js'
import { NextFunction, Request, Response, Router } from "express"
export const invoicesRoute = Router()

// Add
invoicesRoute
.post("/invoice", (req: Request ,res: Response ,next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, addNewInvoice)

// FindAll
invoicesRoute
.get("/invoices", (req: Request ,res: Response ,next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, getAllInvoices)

// FindByChrono
invoicesRoute
.get("/invoice/:chrono", (req: Request ,res: Response ,next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, getInvoiceByChrono)

// Update
invoicesRoute
.put("/invoice/:chrono", (req: Request ,res: Response ,next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, updateInvoiceByChrono)

invoicesRoute
.delete("/invoice/:chrono", (req: Request ,res: Response ,next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, deleteInvoiceByChrono)