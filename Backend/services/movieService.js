import { createMovie as createMovieRepository } from "../repositories/MovieRepo.js";
import { getMovieById as getMovieByIdRepository } from "../repositories/MovieRepo.js";
import { getAllMovies as getAllMoviesRepository } from "../repositories/MovieRepo.js";
import { deleteMovie as deleteMovieRepository } from "../repositories/MovieRepo.js";
import { updateMovie as updateMovieRepo } from "../repositories/MovieRepo.js";
import { getMovieByName as getMovieByNameRepository } from "../repositories/MovieRepo.js";
import { ServiceLayerBody } from "../Utils/ServiceLayerBody.js";

/**
 * @description -> Service for creating a new movie
 * @param {*} movieData 
 * @returns ->  Movie Object from Repo layer
 */

export const createMovie = async (movieData) => {
    return ServiceLayerBody(createMovieRepository, movieData);
}

/**
 * @description -> Service for getting a movie by ID
 * @param {*} movieId 
 * @returns ->  Movie Object from Repo layer
 */

export const getMovieById = async (movieId) => {
    return ServiceLayerBody(getMovieByIdRepository, movieId);
}

/**
 * @description -> Service for getting all movies
 * @returns ->  Array of Movies from Repo layer
 */

export const getAllMovies = async () => {
    return ServiceLayerBody(getAllMoviesRepository);
}

/**
 * @description -> Service for deleting a movie
 * @param {*} movieId 
 * @returns ->  Deleted movie response from repo layer
 */

export const deleteMovie = async (movieId) => {
    return ServiceLayerBody(deleteMovieRepository, movieId);
}

/**
 * @description -> Service for updating a movie
 * @param {*} movieId 
 * @param {*} data 
 * @returns -> Updated movie response from repo layer
 */

export const updateMovie = async (movieId, data) => {
    return ServiceLayerBody(updateMovieRepo, movieId, data);
}

/**
 * @description -> Service for getting a movie by name
 * @param {*} name 
 * @returns ->  Movie Object from Repo layer
 */

export const getMovieByName = async (name) => {
    return ServiceLayerBody(getMovieByNameRepository, name);
}