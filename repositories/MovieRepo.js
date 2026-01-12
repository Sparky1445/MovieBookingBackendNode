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