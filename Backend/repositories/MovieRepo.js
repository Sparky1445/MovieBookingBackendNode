import Movie from "../schemas/Movie.js";
import NotFoundError from "../errors/NotFound.js";
import mongoose from "mongoose";

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
            message: error.message
        }
    }
}

export const getMovieById = async (movieId) => {
    try {
        const movie = await Movie.findById(movieId);

        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            throw new BadRequestError("Invalid Movie ID ~ Repo Layer Error");
        }


        if (movie) {
            return {
                success: true,
                data: movie,
                message: "Movie fetched successfully!!"
            }
        }
        else {

            throw new NotFoundError("Movie not found ~ Repo Layer Error");
        }
    }
    catch (error) {
        return {
            success: false,
            data: {},
            error: error,
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
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, data, { new: true, runValidators: true });
        console.log(updatedMovie);

        if (!updatedMovie) {
            throw new NotFoundError("Movie not found ~ Repo Layer Error");
        }

        return {
            success: true,
            message: "Fetched the movie successfully!",
            data: updatedMovie
        }


    } catch (error) {
        return {
            success: false,
            data: {},
            error: error,

        }

    }

}

export const getMovieByName = async (MovieName) => {

    try {
        const movie = await Movie.find({ name: MovieName });

        if (movie.length === 0) {
            throw new NotFoundError("Movie not found");
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
            message: error.message + "~Repo Layer"
        }
    }
}

