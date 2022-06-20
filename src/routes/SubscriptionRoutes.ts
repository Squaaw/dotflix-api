import { addNewSubscription, getSubscriptionById, getAllSubscriptions, updateSubscriptionById, deleteSubscriptionById } from '../controllers/Subscription'
import { NextFunction, Request, Response, Router } from "express"
export const subscriptionsRoute = Router()

// Add
subscriptionsRoute
.post("/subscription", (req: Request, res: Response, next: NextFunction) => {
    //console.log(req, "req dans subscription route");
    
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, addNewSubscription)

// FindAll
subscriptionsRoute
.get("/subscriptions", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, getAllSubscriptions)

// FindByChrono
subscriptionsRoute
.get("/subscription/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, getSubscriptionById)

// Update
subscriptionsRoute
.put("/subscription/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, updateSubscriptionById)

// Remove
subscriptionsRoute
.delete("/subscription/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, deleteSubscriptionById)