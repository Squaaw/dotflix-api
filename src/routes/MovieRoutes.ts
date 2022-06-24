import { addNewMovie, updateMovie, deleteMovie } from '../controllers/Movie'
import { NextFunction, Request, Response, Router } from "express"
export const moviesRoute = Router()

// Adding new movie
moviesRoute
.post("/movie", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, addNewMovie)

// Updating movie data by ID
moviesRoute
.put("/movie/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, updateMovie)

// Removing a movie by ID
moviesRoute
.delete("/movie/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)
    next();
}, deleteMovie)