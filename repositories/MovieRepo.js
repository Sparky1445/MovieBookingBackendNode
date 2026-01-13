import Movie from "../schemas/Movie.js";
import NotFoundError from "../errors/NotFound.js";
import InternalServerError from "../errors/InternalServerError.js";
import BadRequest from "../errors/badRequest.js";
import mongoose from "mongoose";
import { success } from "zod";

export const createMovie = async (movieData) => {
    try {
        const movie = await Movie.create(movieData);
        return {
            data: movie,
            success: true,
            message: "Movie created successfully "
        }
    }
    catch (error) {
        return {
            data: {},
            success: false,
            message: error.message + "~Repo Layer Error"
        }
    }
}

export const getMovieById = async (movieId) => {
    try {
        const movie = await Movie.findById(movieId);

        if (!(mongoose.Types.ObjectId.isValid(movieId))) {
            throw new NotFoundError(`Movie not found ~ Repo Layer Error`);
        }


        return {
            data: movie,
            success: true,
            message: "Movie fetched successfully"
        }
    }
    catch (error) {
        return {
            data: {},
            success: false,
            message: error.message + "~Repo Layer Error"
        }
    }
}

export const getAllMovies = async () => {
    try {
        const movies = await Movie.find();

        if (!movies) {
            throw new NotFoundError(`Movies not found ~ Repo Layer Error`);
        }


        return {
            data: movies,
            success: true,
            message: "Movies fetched successfully"
        }
    }
    catch (error) {
        return {
            data: {},
            success: false,
            message: error.message + "~Repo Layer Error"
        }
    }
}

export const deleteMovie = async (movieId) => {
    try {
        const movie = await Movie.findByIdAndDelete(movieId);
        return {
            data: movie.name,
            success: true,
            message: "Movie deleted successfully"
        }
    }
    catch (error) {
        return {
            data: {},
            success: false,
            message: error.message + "~Repo Layer Error"
        }
    }
}

export const updateMovie = async (movieId, data) => {

    try {
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, data, { new: true });

        if (!updatedMovie) {
            return {
                success: false,
                message: "Failed to find the movie, try again! ~ Repo layer",
                data: {}
            }
        }
        return {
            success: true,
            message: "Fetched the movie successfully!",
            data: updatedMovie
        }


    } catch (err) {
        return {
            success: false,
            message: err.message + "~Repo Layer",
            data: {}
        };

    }

}