import { createTheatre as createTheatreRepository } from "../repositories/TheatreRepo.js";
import { getTheatreById as getTheatreByIdRepository } from "../repositories/TheatreRepo.js";
import { getAllTheatres as getAllTheatresRepository } from "../repositories/TheatreRepo.js";
import { deleteTheatre as deleteTheatreRepository } from "../repositories/TheatreRepo.js";
import { updateTheatre as updateTheatreRepository } from "../repositories/TheatreRepo.js";
import { ServiceLayerBody } from "../Utils/ServiceLayerBody.js";
import { modifyMoviesInTheatre as modifyMoviesInTheatreRepository } from "../repositories/TheatreRepo.js";
import mongoose from "mongoose";
import Movie from "../schemas/Movie.js";
import NotFoundError from "../errors/NotFound.js";


/**
 * @description -> Service for creating a new theatre
 * @param {*} theatreData 
 * @returns ->  Theatre Object from Repo layer
 */

export const createTheatre = async (theatreData) => {

    return ServiceLayerBody(createTheatreRepository, theatreData);
}

/**
 * @description -> Service for getting a theatre by ID
 * @param {*} theatreId 
 * @returns ->  Theatre Object from Repo layer
 */

export const getTheatreById = async (theatreId) => {
    return ServiceLayerBody(getTheatreByIdRepository, theatreId);
}

/**
 * @description -> Service for getting all the theatres
 * @returns ->  Array of Theatres from Repo layer
 */

export const getAllTheatres = async (query) => {

    return ServiceLayerBody(getAllTheatresRepository, query);

}

/**
 * @description -> Service for updating a theatre
 * @param {*} id 
 * @param {*} theatreData 
 * @returns -> 
 */

export const updateTheatre = async (id, theatreData) => {
    return ServiceLayerBody(updateTheatreRepository, id, theatreData);
}

/**
 * @description -> Service for deleting a theatre
 * @param {*} id 
 * @returns ->  Deleted theatre response from repo layer
 */

export const deleteTheatre = async (id) => {
    return ServiceLayerBody(deleteTheatreRepository, id);
}


export const modifyMoviesInTheatre = async (theatreId, movieIds, operation) => {
    const movieIdArray = movieIds.split(",").map(id => id.trim()).filter(id => id !== "");
    const Operation = parseInt(operation);

    const movieIdObjectIdArray = movieIdArray.map((movieId) => new mongoose.Types.ObjectId(movieId));

    const theatreIdObjectId = new mongoose.Types.ObjectId(theatreId);

    for (const movieId of movieIdObjectIdArray) {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            throw new NotFoundError(`Movie ${movieId} is Invalid ~ Service Layer Error`);
        }
    }

    return ServiceLayerBody(modifyMoviesInTheatreRepository, theatreIdObjectId, movieIdObjectIdArray, Operation);
}