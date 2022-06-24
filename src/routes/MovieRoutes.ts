import { getAllMovies, getMovieById, getMoviesByGenre, addNewMovie, updateMovie, deleteMovie } from '../controllers/Movie'
import { Router } from "express"
export const moviesRoute = Router()

// Fetching all movies
moviesRoute.get('/movie', getAllMovies)

// Fetching movie by ID
moviesRoute.get('/movie/:id', getMovieById)

// Fetching movies by genre
moviesRoute.get('/movie/genre/:genre', getMoviesByGenre)

// Adding new movie
moviesRoute.post('/movie', addNewMovie)

// Updating existing movie data by ID
moviesRoute.put('/movie/:id', updateMovie)

// Removing existing movie by ID
moviesRoute.delete('/movie/:id', deleteMovie)