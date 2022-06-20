import { addNewCustomer, getCustomerById, getAllCustomers, updateCustomerById, deleteCustomerById } from '../controllers/Customer'
import { NextFunction, Request, Response, Router } from "express"
export const customersRoute = Router()

// Add
customersRoute
.post("/customer", (req: Request, res: Response, next: NextFunction) => {
    //console.log(req, "req dans customer route");
    
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, addNewCustomer)

// FindAll
customersRoute
.get("/customers", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, getAllCustomers)

// FindByChrono
customersRoute
.get("/customer/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, getCustomerById)

// Update
customersRoute
.put("/customer/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, updateCustomerById)

// Remove
customersRoute
.delete("/customer/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, deleteCustomerById)