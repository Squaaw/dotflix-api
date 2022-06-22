import { addNewUserTicket, getUserTicketById, getAllUserTickets, updateUserTicketById, deleteUserTicketById } from '../controllers/UserTicket'
import { NextFunction, Request, Response, Router } from "express"
export const userTicketRoute = Router()

// Add
userTicketRoute
.post("/user-ticket", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, addNewUserTicket)

// FindAll
userTicketRoute
.get("/user-tickets", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, getAllUserTickets)

// FindByChrono
userTicketRoute
.get("/user-ticket/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, getUserTicketById)

// Update
userTicketRoute
.put("/user-ticket/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, updateUserTicketById)

// Remove
userTicketRoute
.delete("/user-ticket/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, deleteUserTicketById)