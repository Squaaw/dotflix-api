import { Request, Response } from "express"
import mongoose from "mongoose"
import { Movie } from "../interfaces/Movie"
import MovieSchema from "../models/MovieSchema"

// Fetching all movies
const getAllMovies = (req: Request, res: Response) => {
    return MovieSchema.find()
        .then((doc: Movie[]) => res.status(200).json({ movies: doc }))
        .catch((err: any) => res.status(500).json({ error: true, message: err }))
}

// Fetching movie by ID
const getMovieById = (req: Request, res: Response) => {
    const movieId = new mongoose.Types.ObjectId(req.params.id)

    MovieSchema.findById(movieId)
        .then((doc: Movie) => {
            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: "Le film recherché n'existe pas ou a été supprimé !"
                })
            }

            return res.status(200).json({ movie: doc })
        })
        .catch((err: any) => {
            return res.status(500).json({ error: true, message: err })
        })
}

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
        .then((doc: Movie) => {
            res.status(201).json({
                error: false,
                message: `Le film ${doc.title} a correctement été ajouté.`
            })
        })
        .catch((err: any) => {
            res.status(500).json({ error: true, message: err })
        })
}

// Updating existing movie data
const updateMovie = (req: Request, res: Response) => {
    const movieFilter = { _id: new mongoose.Types.ObjectId(req.params.id) }
    const movieData = req.body

    MovieSchema.findOneAndUpdate(movieFilter, movieData)
        .then((doc: Movie) => {
            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: "Le film que vous souhaitez modifier n'existe pas !"
                })
            }
                
            return res.status(200).json({
                error: false,
                message: `Les informations du film ${doc.title} ont correctement été mises à jour.`
            })
        })
        .catch((err) => {
            return res.status(500).json({ error: true, message: err })
        })
}

// Removing existing movie
const deleteMovie = (req: Request, res: Response) => {
    const movieFilter = { _id: new mongoose.Types.ObjectId(req.params.id) }

    MovieSchema.findOneAndDelete(movieFilter)
        .then((doc: Movie) => {
            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: "Le film que vous souhaitez supprimer n'existe pas ou a déjà été supprimé !"
                })
            }

            return res.status(201).json({
                error: false,
                message: `Le film ${doc.title} a correctement été supprimé.`
            })
        })
        .catch((err) => {
            return res.status(500).json({ error: true, message: err })
        })
}

export { addNewMovie, updateMovie, deleteMovie, getAllMovies, getMovieById };