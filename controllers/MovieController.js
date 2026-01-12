
/**
 * @param {Object} req - The request object that has movie data (name,descr,cast , ...etc)
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the movie data.
 */
import { createMovie as createMovieService } from "../services/movieService.js";
import { getMovieById as getMovieByIdService } from "../services/movieService.js";
import { getAllMovies as getAllMoviesService } from "../services/movieService.js";
import { deleteMovie as deleteMovieService } from "../services/movieService.js";
import NotFoundError from "../errors/NotFound.js";
import InternalServerError from "../errors/InternalServerError.js";
import BadRequest from "../errors/badRequest.js";
import SuccessBody from "../Utils/SuccessBody.js";
import ErrorBody from "../Utils/ErrorBody.js";


export const createMovie = async (req, res) => {
    const movieResponse = await createMovieService(req.body);

    if (movieResponse.success) {
        return SuccessBody(res, movieResponse.data, "Movie Created Successfully!", 201);

    } else {
        return ErrorBody(res, movieResponse.error, 500);
    }
}

export const getMovieById = async (req, res, next) => {
    try {

        const movieResponse = await getMovieByIdService(req.params.id);

        if (movieResponse.success) {
            return SuccessBody(res, movieResponse.data, "Movie fetched Successfully!", 200);
        }

        else if (!movieResponse.success) {
            throw new NotFoundError("Movie not found ~ Controller Layer Error");


        }
    } catch (error) {
        next(error);
    }
}

export const getAllMovies = async (req, res) => {
    const movieResponse = await getAllMoviesService();


    if (movieResponse.success) {
        return SuccessBody(res, movieResponse.data, "Movies fetched Successfully!", 200);
    }

    else {
        return ErrorBody(res, movieResponse.error, 500);
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const deleteMovieResponse = await deleteMovieService(req.params.id);
        if (!deleteMovieResponse.success) {
            throw new NotFoundError("Movie not found - Controller Layer Error");
        }

        return SuccessBody(res, deleteMovieResponse.data, "Movie Deleted Successfully!", 200);
    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}