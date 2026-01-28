import NotFoundError from "../errors/NotFound.js";
import ErrorBody from "../Utils/ErrorBody.js";
import SuccessBody from "../Utils/SuccessBody.js";
import { createShow as createShowService } from "../services/showService.js";
import Movie from "../schemas/Movie.js";
import Theatre from "../schemas/Theatre.js";
import BadRequestError from "../errors/badRequest.js";
import { getShowById as getShowByIdService } from "../services/showService.js";
import mongoose from "mongoose";
import { deleteShow as deleteShowService } from "../services/showService.js";

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

export const getShowById = async (req, res) => {
    try {
        const { theatreId, movieId } = req.params;


        if (!theatreId || !movieId) {
            throw new BadRequestError("Theatre ID and Movie ID are required!");
        }

        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            throw new NotFoundError("Movie does not exist!!");
        }
        if (!mongoose.Types.ObjectId.isValid(theatreId)) {
            throw new NotFoundError("Theatre does not exist!!");
        }

        const showResponse = await getShowByIdService(theatreId, movieId);

        if (!showResponse.success) {
            return ErrorBody(res, showResponse.error, 400);
        }


        return SuccessBody(res, showResponse.data, "Show fetched successfully", 200);

    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}

export const deleteShow = async (req, res) => {
    try {
        const showResponse = await deleteShowService(req.params.showId);

        if (!showResponse.success) {
            return ErrorBody(res, showResponse.error, 400);
        }

        return SuccessBody(res, showResponse.data, "Show deleted successfully", 200);

    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}