import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import { Movie } from "../interfaces/Movie"
import MovieSchema from "../models/MovieSchema"

// Adding new movie
const addNewMovie = (req: Request, res: Response) => {    
    const newMovie = new MovieSchema({
        "title": req.body.title,
        "synopsis": req.body.synopsis,
        "category": req.body.category,
        "releaseDate": req.body.releaseDate,
        "duration": req.body.duration,
        "posterUrl": req.body.posterUrl,
    })

    return newMovie
        .save()
        .then((data: Movie) => res.status(201).json({data}))
        .catch((err: any) => res.status(500).json({ err }));
}

export { addNewMovie };