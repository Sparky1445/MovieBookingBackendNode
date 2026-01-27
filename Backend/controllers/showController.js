import NotFoundError from "../errors/NotFound.js";
import ErrorBody from "../Utils/ErrorBody.js";
import SuccessBody from "../Utils/SuccessBody.js";
import { createShow as createShowService } from "../services/showService.js";
import Movie from "../schemas/Movie.js";
import Theatre from "../schemas/Theatre.js";

export const createShow = async (req, res) => {
    try {
        const { movieId, theatreId } = req.body;

        const movie = await Movie.findById(movieId);
        const theatre = await Theatre.findById(theatreId);


        if (!movie) {
            throw new NotFoundError("Movie does not exist!!");
        }
        if (!theatre) {
            throw new NotFoundError("Theatre does not exist!!");
        }

        const showResponse = await createShowService(req.body);

        if (showResponse.success) {
            return SuccessBody(res, showResponse.data, "    Show created successfully", 201);
        }
        else {
            return ErrorBody(res, showResponse.error, 400);
        }

    } catch (error) {
        return ErrorBody(res, error, 500);

    }

}