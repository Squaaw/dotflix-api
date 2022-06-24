import { getAllMovies, getMovieById, getMoviesByGenre, addNewMovie, updateMovie, deleteMovie } from '../controllers/Movie'
import { NextFunction, Request, Response, Router } from "express"
export const moviesRoute = Router()

// Fetching all movies
moviesRoute
.get('/movie', (req: Request, res: Response, next: NextFunction) => {
    next();
}, getAllMovies)

// Fetching movie by ID
moviesRoute
.get('/movie/:id', (req: Request, res: Response, next: NextFunction) => {
    next();
}, getMovieById)

// Fetching movies by genre
moviesRoute
.get('/movie/genre/:genre', (req: Request, res: Response, next: NextFunction) => {
    next();
}, getMoviesByGenre)

// Adding new movie
moviesRoute
.post("/movie", (req: Request, res: Response, next: NextFunction) => {
    next();
}, addNewMovie)

// Updating existing movie data by ID
moviesRoute
.put("/movie/:id", (req: Request, res: Response, next: NextFunction) => {
    next();
}, updateMovie)

// Removing existing movie by ID
moviesRoute
.delete("/movie/:id", (req: Request, res: Response, next: NextFunction) => {
    next();
}, deleteMovie)