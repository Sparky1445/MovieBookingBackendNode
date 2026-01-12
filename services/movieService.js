import { createMovie as createMovieRepository } from "../repositories/MovieRepo.js";
import { getMovieById as getMovieByIdRepository } from "../repositories/MovieRepo.js";
import { getAllMovies as getAllMoviesRepository } from "../repositories/MovieRepo.js";
import { deleteMovie as deleteMovieRepository } from "../repositories/MovieRepo.js";
import NotFoundError from "../errors/NotFound.js";
import InternalServerError from "../errors/InternalServerError.js";
import BadRequest from "../errors/badRequest.js";


export const createMovie = async (movieData) => {

    try {
        const movieResponse = await createMovieRepository(movieData);
        return movieResponse;
    }
    catch (error) {
        return {
            success: false,
            message: error.message + "~Service Layer Error",
            data: {},
            error: error
        }

    }
}

export const getMovieById = async (movieId) => {
    try {
        const movieResponse = await getMovieByIdRepository(movieId);

        if (!movieResponse.success) {
            throw new NotFoundError(`Movie not found ~ Service Layer Error`);
        }

        return movieResponse;
    }
    catch (error) {
        return {
            success: false,
            message: error.message + "~Service Layer Error",
            data: {},
            error: error
        }
    }
}

export const getAllMovies = async (req, res) => {
    try {
        const movieResponse = await getAllMoviesRepository();
        return movieResponse;
    }
    catch (error) {
        return {
            success: false,
            message: error.message + "~Service Layer Error",
            data: {},
            error: error
        }
    }
}

export const deleteMovie = async (movieId) => {
    try {
        const movieResponse = await deleteMovieRepository(movieId);
        return movieResponse;
    }
    catch (error) {
        return {
            success: false,
            message: error.message + "~Service Layer Error",
            data: {},
            error: error
        }
    }
}