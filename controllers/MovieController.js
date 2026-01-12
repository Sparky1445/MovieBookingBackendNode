
/**
 * @param {Object} req - The request object that has movie data (name,descr,cast , ...etc)
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the movie data.
 */
import { createMovie as createMovieService } from "../services/movieService.js";
import { getMovieById as getMovieByIdService } from "../services/movieService.js";
import { getAllMovies as getAllMoviesService } from "../services/movieService.js";
import { deleteMovie as deleteMovieService } from "../services/movieService.js";

export const createMovie = async (req, res) => {
    const movieResponse = await createMovieService(req.body);

    if (movieResponse.success) {
        return res.status(201).json({
            success: true,
            message: "Movie created successfully",
            data: movieResponse.data,
            error: {}
        })

    } else {
        return res.status(500).json({
            success: false,
            message: movieResponse.message + "Controller Layer Error",
            data: {},
            error: movieResponse.error
        })
    }
}

export const getMovieById = async (req, res) => {
    const movieResponse = await getMovieByIdService(req.params.id);

    if (movieResponse.success) {
        return res.status(200).json({
            success: true,
            message: "Movie fetched successfully",
            data: movieResponse.data,
            error: {}
        })
    }
    else {
        return res.status(500).json({
            success: false,
            message: movieResponse.message + "Controller Layer Error",
            data: {},
            error: movieResponse.error
        })
    }
}

export const getAllMovies = async (req, res) => {
    const movieResponse = await getAllMoviesService();

    if (movieResponse.success) {
        return res.status(200).json({
            success: true,
            message: "Movies fetched successfully",
            data: movieResponse.data,
            error: {}
        })
    }
    else {
        return res.status(500).json({
            success: false,
            message: movieResponse.message + "Controller Layer Error",
            data: {},
            error: movieResponse.error
        })
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const deleteMovieResponse = await deleteMovieService(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Movie deleted successfully",
            data: deleteMovieResponse.data,
            error: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message + "Controller Layer Error",
            data: {},
            error: error
        })
    }
}