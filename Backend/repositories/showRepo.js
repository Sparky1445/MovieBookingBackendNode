import Show from "../schemas/Show.js";
import InternalServerError from "../errors/InternalServerError.js";
import Theatre from "../schemas/Theatre.js";
import Movie from "../schemas/Movie.js";
import NotFoundError from "../errors/NotFound.js";
import mongoose from "mongoose";

export const createShow = async (showData) => {
    try {
        const show = await Show.create(showData);

        if (!show) {
            throw new InternalServerError("Failed to create show");
        }

        return {
            success: true,
            message: "Show created successfully",
            data: show
        }

    } catch (error) {
        return {
            success: false,
            data: {},
            message: "Failed to create show",
            error: error
        }
    }
}

export const getShowById = async (theatreId, movieId) => {
    try {
        const theatre = await Theatre.findById(theatreId);
        const movie = await Movie.findById(movieId);

        if (!theatre) {
            throw new NotFoundError("Theatre does not exist!!");
        }
        if (!movie) {
            throw new NotFoundError("Movie does not exist!!");
        }

        const show = await Show.findOne({ theatreId, movieId });

        if (!show) {
            throw new NotFoundError("Show does not exist!!");
        }

        return {
            success: true,
            message: "Show fetched successfully",
            data: show
        }
    } catch (error) {
        return {
            success: false,
            data: {},
            message: "Failed to fetch show",
            error: error
        }
    }
}

export const deleteShow = async (showId) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(showId)) {
            throw new NotFoundError("Show does not exist!!");
        }

        const show = await Show.findByIdAndDelete(showId);

        if (!show) {
            throw new NotFoundError("Show does not exist!!");
        }

        return {
            success: true,
            message: "Show deleted successfully",
            data: show
        }
    } catch (error) {
        return {
            success: false,
            data: {},
            message: "Failed to delete show",
            error: error
        }
    }
}