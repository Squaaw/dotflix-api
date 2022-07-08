import { getAllSeries, getSerieById, getSeriesByGenre, addNewSerie, updateSerie, deleteSerie, addNewSeason, updateSeason, deleteSeason, addNewEpisode, updateEpisode, deleteEpisode } from '../controllers/Serie'
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

// Adding new season
seriesRoute.post('/serie/:id/season', checkUserAdmin, addNewSeason)

// Updating existing season
seriesRoute.put('/serie/:serieId/season/:seasonId', checkUserAdmin, updateSeason)

// Removing existing season
seriesRoute.delete('/serie/:serieId/season/:seasonId', checkUserAdmin, deleteSeason)

// Adding new episode
seriesRoute.post('/serie/:serieId/season/:seasonId/episode', checkUserAdmin, addNewEpisode)

// Updating existing episode
seriesRoute.put('/serie/:serieId/season/:seasonId/episode/:episodeId', checkUserAdmin, updateEpisode)

// Removing existing episode
seriesRoute.delete('/serie/:serieId/season/:seasonId/episode/:episodeId', checkUserAdmin, deleteEpisode)