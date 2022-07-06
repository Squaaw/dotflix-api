import { getAllSeries, getSerieById, getSeriesByGenre, addNewSerie, updateSerie, deleteSerie } from '../controllers/Serie'
import { checkUserAdmin } from '../middlewares/Auth.middleware'
import { Router } from "express"
export const seriesRoute = Router()

// Fetching all series
seriesRoute.get('/serie', getAllSeries)

// Fetching serie by ID
seriesRoute.get('/serie/:id', getSerieById)

// Fetching series by genre
seriesRoute.get('/serie/genre/:genre', getSeriesByGenre)

// Adding new serie
seriesRoute.post('/serie', checkUserAdmin, addNewSerie)

// Updating existing serie data by ID
seriesRoute.put('/serie/:id', checkUserAdmin, updateSerie)

// Removing existing serie by ID
seriesRoute.delete('/serie/:id', checkUserAdmin, deleteSerie)