import Movie from "../schemas/Movie.js";

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