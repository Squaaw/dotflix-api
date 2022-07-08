import { Request, Response } from "express"
import mongoose, { AnyArray, mongo } from "mongoose"
import { Serie } from "../interfaces/Serie"
import { Season } from "../interfaces/Season"
import SerieSchema from "../models/SerieSchema"
import { exit } from "process"

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
        "posterUrl": req.body.posterUrl
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
    // Envoyer un tableau avec les ID et numéros des saisons pour éviter les appels allers-retours ?
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

// Adding new episode
const addNewEpisode = async (req: Request, res: Response) => {
    const filter = {
        _id: new mongoose.Types.ObjectId(req.params.serieId),
        'seasons._id': new mongoose.Types.ObjectId(req.params.seasonId)
    }

    const serie: Serie = await SerieSchema.findOne(filter);
    const seasons: Season[] = serie.seasons;
    let episodesCount = 0;

    seasons.forEach(season => {
        if (season._id.equals(new mongoose.Types.ObjectId(req.params.seasonId))) {
            episodesCount = season.episodes.length;
            return;
        }
    });

    const query = {
        $push: {
            'seasons.$.episodes': {
                _id: new mongoose.Types.ObjectId(),
                number: episodesCount + 1,
                title: req.body.title,
                synopsis: req.body.synopsis,
                duration: req.body.duration,
                posterUrl: req.body.posterUrl
            }
        }
    }

    SerieSchema.findOneAndUpdate(filter, query)
        .then((doc: Serie) => {
            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: "La série pour laquelle vous souhaitez ajouter un épisode est introuvable !"
                })
            }
                
            return res.status(200).json({
                error: false,
                message: `L'épisode pour la série ${doc.title} a correctement été ajouté.`
            })
        })
        .catch((err) => {
            return res.status(500).json({ error: true, message: err })
        })
}

// Updating existing episode
const updateEpisode = async (req: Request, res: Response) => {
    const filter = {
        _id: new mongoose.Types.ObjectId(req.params.serieId),
        'seasons._id': new mongoose.Types.ObjectId(req.params.seasonId),
        'seasons.episodes._id': new mongoose.Types.ObjectId(req.params.episodeId)
    }

    // "Positional $" est static et prend la valeur de la premiere occurence. Pour les tableaux profonds (nested arrays), il faut utiliser les filtres
    const query = {
        $set: {
            "seasons.$[season].episodes.$[episode].number": req.body.number,
            "seasons.$[season].episodes.$[episode].title": req.body.title,
            "seasons.$[season].episodes.$[episode].synopsis": req.body.synopsis,
            "seasons.$[season].episodes.$[episode].duration": req.body.duration,
            "seasons.$[season].episodes.$[episode].posterUrl": req.body.posterUrl
        }
    }

    const options = {
        arrayFilters: [
            { "season._id": new mongoose.Types.ObjectId(req.params.seasonId) },
            { "episode._id": new mongoose.Types.ObjectId(req.params.episodeId) }
        ]
    }

    SerieSchema.findOneAndUpdate(filter, query, options)
        .then((doc: Serie) => {
            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: "L'épisode que vous souhaitez modifier n'existe pas !"
                })
            }
                
            return res.status(200).json({
                error: false,
                message: `Les informations de l'épisode de la série ${doc.title} ont correctement été mises à jour.`
            })
        })
        .catch((err) => {
            return res.status(500).json({ error: true, message: err })
        })
}

// Removing existing episode
const deleteEpisode = async (req: Request, res: Response) => {
    const filter = {
        _id: new mongoose.Types.ObjectId(req.params.serieId),
        'seasons._id': new mongoose.Types.ObjectId(req.params.seasonId),
        'seasons.episodes._id': new mongoose.Types.ObjectId(req.params.episodeId)
    }

    const query = {
        $pull: {
            "seasons.$.episodes": { _id: new mongoose.Types.ObjectId(req.params.episodeId) }
        }
    }

    // const options = {
    //     arrayFilters: [
    //         { "season._id": new mongoose.Types.ObjectId(req.params.seasonId) },
    //         { "episode._id": new mongoose.Types.ObjectId(req.params.episodeId) }
    //     ]
    // }

    SerieSchema.findOneAndUpdate(filter, query)
        .then((doc: Serie) => {
            if (!doc) {
                return res.status(404).json({
                    error: true,
                    message: "L'épisode que vous souhaitez supprimer n'existe pas !"
                })
            }
                
            return res.status(200).json({
                error: false,
                message: `L'épisode de la série ${doc.title} a correctement été supprimé.`
            })
        })
        .catch((err) => {
            return res.status(500).json({ error: true, message: err })
        })
}

export { addNewSerie, updateSerie, deleteSerie, getAllSeries, getSerieById, getSeriesByGenre, addNewSeason, updateSeason, deleteSeason, addNewEpisode, updateEpisode, deleteEpisode }