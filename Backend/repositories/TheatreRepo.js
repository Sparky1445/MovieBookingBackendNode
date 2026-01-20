import Theatre from "../schemas/Theatre.js";
import mongoose from "mongoose";
import NotFoundError from "../errors/NotFound.js";
import BadRequestError from "../errors/badRequest.js";


export const createTheatre = async (theatreData) => {
    try {
        const theatre = await Theatre.create(theatreData);

        if (!theatre) {
            throw new BadRequestError("Failed to create theatre");
        }

        return {
            success: true,
            data: theatre,
            message: "Theatre created successfully"
        }

    } catch (error) {
        return {
            success: false,
            data: {},
            error: error,
            message: error + "~Repo Layer Error"
        }
    }
}

export const getTheatreById = async (id) => {
    try {
        const theatre = await Theatre.findById(id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestError("Invalid Theatre ID ~ Repo Layer Error");
        }


        if (theatre) {
            return {
                success: true,
                data: theatre,
                message: "Theatre fetched successfully"
            }
        }
        else {

            throw new NotFoundError("Theatre not found ~ Repo Layer Error");
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