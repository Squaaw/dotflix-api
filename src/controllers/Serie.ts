import { Request, Response } from "express"
import mongoose from "mongoose"
import { Serie } from "../interfaces/Serie"
import SerieSchema from "../models/SerieSchema"

// Fetching all series
const getAllSeries = (req: Request, res: Response) => {
    return SerieSchema.find()
        .then((doc: Serie[]) => res.status(200).json({ series: doc }))
        .catch((err: any) => res.status(500).json({ error: true, message: err }))
}

// Fetching serie by ID
const getSerieById = (req: Request, res: Response) => {
    const serieId = new mongoose.Types.ObjectId(req.params.id)

    SerieSchema.findById(serieId)
        .then((doc: Serie) => {
            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: "La série recherchée n'existe pas ou a été supprimée !"
                })
            }

            return res.status(200).json({ serie: doc })
        })
        .catch((err: any) => {
            return res.status(500).json({ error: true, message: err })
        })
}

// Fetching all series by genre
const getSeriesByGenre = (req: Request, res: Response) => {
    const genre = req.params.genre

    // récupérer un ID
    // rechercher si le genre existe
    // si il existe, récupérer son nom et rechercher la série avec

    return SerieSchema.find({ category: genre })
        .then((doc: Serie[]) => res.status(200).json({ series: doc }))
        .catch((err: any) => res.status(500).json({ error: true, message: err }))
}

// Adding new serie
const addNewSerie = (req: Request, res: Response) => {
    const newSerie = new SerieSchema({
        "title": req.body.title,
        "synopsis": req.body.synopsis,
        "category": req.body.category,
        "releaseDate": req.body.releaseDate,
        "endDate": req.body.endDate,
        "posterUrl": req.body.posterUrl,
        // "seasons": req.body.seasons
    })

    return newSerie
        .save()
        .then((doc: Serie) => {
            res.status(201).json({
                error: false,
                message: `La série ${doc.title} a correctement été ajoutée.`
            })
        })
        .catch((err: any) => {
            res.status(500).json({ error: true, message: err })
        })
}

// Updating existing serie data
const updateSerie = (req: Request, res: Response) => {
    const serieFilter = { _id: new mongoose.Types.ObjectId(req.params.id) }
    const serieData = req.body

    SerieSchema.findOneAndUpdate(serieFilter, serieData)
        .then((doc: Serie) => {
            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: "La série que vous souhaitez modifier n'existe pas !"
                })
            }
                
            return res.status(200).json({
                error: false,
                message: `Les informations de la série ${doc.title} ont correctement été mises à jour.`
            })
        })
        .catch((err) => {
            return res.status(500).json({ error: true, message: err })
        })
}

// Removing existing serie
const deleteSerie = (req: Request, res: Response) => {
    const serieFilter = { _id: new mongoose.Types.ObjectId(req.params.id) }

    SerieSchema.findOneAndDelete(serieFilter)
        .then((doc: Serie) => {
            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: "La série que vous souhaitez supprimer n'existe pas ou a déjà été supprimée !"
                })
            }

            return res.status(201).json({
                error: false,
                message: `La série ${doc.title} a correctement été supprimée.`
            })
        })
        .catch((err) => {
            return res.status(500).json({ error: true, message: err })
        })
}

// Adding new season
const addNewSeason = async (req: Request, res: Response) => {
    const filter = { _id: new mongoose.Types.ObjectId(req.params.id)}

    // Récupération des informations de la série afin d'obtenir le nombre de saisons déjà existantes.
    const serie: Serie = await SerieSchema.findOne(filter);
    const seasonsCount = serie.seasons.length

    const query = {
        $push: {
            'seasons': {
                _id: new mongoose.Types.ObjectId(),
                number: seasonsCount + 1
                // episodes: [
                    //                     {
                    //                         _id: new mongoose.Types.ObjectId(),
                    //                         number: 1,
                    //                         title: "Test"
                    //                     },
            // ]
            }
        }
    }

    SerieSchema.findOneAndUpdate(filter, query)
        .then((doc: Serie) => {
            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: "La série pour laquelle vous souhaitez ajouter la saison est introuvable !"
                })
            }
                
            return res.status(200).json({
                error: false,
                message: `La saison pour la série ${doc.title} a correctement été ajoutée.`
            })
        })
        .catch((err) => {
            return res.status(500).json({ error: true, message: err })
        })
}

// Updating existing season data
const updateSeason = (req: Request, res: Response) => {
    const filter = {
        _id: new mongoose.Types.ObjectId(req.params.serieId),
        'seasons._id': new mongoose.Types.ObjectId(req.params.seasonId)
    }

    const query = {
        $set: {
            'seasons.$.number': req.body.seasonNumber
        }
    }

    SerieSchema.findOneAndUpdate(filter, query)
        .then((doc: Serie) => {
            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: "La saison que vous souhaitez modifier n'existe pas !"
                })
            }
                
            return res.status(200).json({
                error: false,
                message: `Les informations de la saison de la série ${doc.title} ont correctement été mises à jour.`
            })
        })
        .catch((err) => {
            return res.status(500).json({ error: true, message: err })
        })
}

// Removing existing season
const deleteSeason = (req: Request, res: Response) => {
    const filter = { _id: new mongoose.Types.ObjectId(req.params.serieId) }

    const query = {
        $pull: {
            seasons: { _id: new mongoose.Types.ObjectId(req.params.seasonId) }
        }
    }

    SerieSchema.findOneAndUpdate(filter, query)
        .then((doc: Serie) => {
            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: "La saison que vous souhaitez supprimer n'existe pas !"
                })
            }
                
            return res.status(200).json({
                error: false,
                message: `La saison de la série ${doc.title} a correctement été supprimée.`
            })
        })
        .catch((err) => {
            return res.status(500).json({ error: true, message: err })
        })
}

export { addNewSerie, updateSerie, deleteSerie, getAllSeries, getSerieById, getSeriesByGenre, addNewSeason, updateSeason, deleteSeason }