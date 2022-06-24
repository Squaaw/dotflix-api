import { NextFunction, Request, Response } from "express"

export const checkUserAdmin = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization')
    
    if (authHeader !== "admin")
        return res.status(400).json({ error: true, message: "Forbidden" })
        
    next()
}