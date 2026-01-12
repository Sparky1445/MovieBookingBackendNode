
/**
 * @param {Object} req - The request object that has movie data (name,descr,cast , ...etc)
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the movie data.
 */
import { createMovie as createMovieService } from "../services/movieService.js";

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