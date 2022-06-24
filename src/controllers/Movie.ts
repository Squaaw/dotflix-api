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
        .then((data: Movie) => res.status(201).json({
            error: false,
            message: "Le film a correctement été ajouté."
        }))
        .catch((err: any) => res.status(500).json({
            error: true,
            message: err
        }));
}

// Updating movie data
const updateMovie = (req: Request, res: Response) => {
    const movieId = new mongoose.Types.ObjectId(req.params.id);

    return MovieSchema.findById(movieId)
        .then((data) => {
            if (!data)
                return res.status(404).json({
                    error: true,
                    message: "Le film que vous souhaitez modifier n'existe pas !"
                });
                
            data.set(req.body);

            return data
                .save()
                .then((data: any) => res.status(200).json({
                    error: false,
                    message: "Les informations du film ont correctement été mises à jour."
                }))
                .catch((err: any) => res.status(500).json({
                    error: true,
                    message: err
                }));
        })
        .catch((error) => res.status(500).json({
            error: true,
            message: error
        }));
};

const deleteMovie = (req: Request, res: Response) => {
    const movieId = new mongoose.Types.ObjectId(req.params.id);

    MovieSchema.findOneAndDelete({ _id: movieId })
        .then((data: Movie) => {
            if (!data)
                return res.status(404).json({
                    error: true,
                    message: "Le film que vous souhaitez supprimer n'existe pas !"
                });

            return res.status(201).json({
                error: false,
                message: `Le film ${data.title} a correctement été supprimé.`
            })
        })
        .catch((err) => {
            return res.status(500).json({
                error: true,
                message: err
            })
        })
};

export { addNewMovie, updateMovie, deleteMovie };