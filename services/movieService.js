import { createMovie as createMovieRepository } from "../repositories/MovieRepo.js";

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