import Theatre from "../schemas/Theatre.js";
import mongoose from "mongoose";
import NotFoundError from "../errors/NotFound.js";
import BadRequestError from "../errors/badRequest.js";
import InternalServerError from "../errors/InternalServerError.js";



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

export const getAllTheatres = async (query) => {

    const { page, limit, ...SearchData } = query;

    try {

        const theatreCount = await Theatre.find(SearchData).countDocuments();
        const remainder = theatreCount % limit;
        const totalPages = (remainder == 0 ? theatreCount / limit : (theatreCount / limit) + 1);

        if (page <= totalPages) {

            var theatre = await Theatre.find(SearchData).skip((page - 1) * limit).limit(limit);
        } else {
            throw new InternalServerError("Something Went Wrong.Please check the page number correctly!");
        }

        if (!theatre) {
            throw new NotFoundError("Theatres not found ~ Repo Layer Error");
        }

        return {
            success: true,
            data: theatre,
            message: "Theatres fetched successfully"
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

export const updateTheatre = async (id, theatreData) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, theatreData, { new: true });

        if (!response) {
            throw new NotFoundError("Theatre not found ~ Repo Layer Error");
        }

        return {
            success: true,
            data: response,
            message: "Theatre updated successfully"
        }
    } catch (error) {

        return {
            success: false,
            data: {},
            error: error,
            message: error.message + "~Repo Layer Error"
        }
    }
}



export const deleteTheatre = async (id) => {
    try {
        const TheatreResp = await Theatre.findByIdAndDelete(id);

        if (!TheatreResp) {
            throw new NotFoundError("Theatre not found ~ Repo Layer Error");
        }

        return {
            success: true,
            data: TheatreResp,
            message: "Theatre deleted successfully"
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


export const modifyMoviesInTheatre = async (TheatreId, movieIds, insert) => {
    try {
        const theatre = await Theatre.findById(TheatreId);

        if (!theatre) {
            throw new NotFoundError("Theatre not found ~ Repo Layer Error");
        }


        if (insert) {
            movieIds.forEach((movieId) => {


                if (theatre.movies.includes(movieId)) {
                    throw new BadRequestError(`Movie ${movieId} already exists in the theatre ~ Repo Layer Error`);
                }
                theatre.movies.push(movieId);
            })
        } else {
            if (theatre.movies.length <= 0) {
                throw new BadRequestError("No movies found in the theatre ~ Repo Layer Error");
            }

            theatre.movies = theatre.movies.pull(...movieIds);
        }

        await theatre.save();
        await theatre.populate("movies")

        return {
            success: true,
            data: theatre,
            message: "Movies in Theatre updated successfully"
        }



    } catch (error) {

        return {
            success: false,
            data: {},
            error: error,
            message: error.message + "~Repo Layer Error"
        }
    }
}

export const getTheatresByMovieId = async (movieId, query) => {
    const { page, limit, ...SearchData } = query;

    try {

        const theatreCount = await Theatre.find(SearchData).countDocuments();
        const remainder = theatreCount % limit;
        const totalPages = (remainder == 0 ? theatreCount / limit : (theatreCount / limit) + 1);

        if (page <= totalPages) {

            var theatreResponse = await Theatre.find({
                movies: { $in: [movieId] }, ...SearchData
            }).skip((page - 1) * limit).limit(limit);
        } else {
            throw new InternalServerError("Something Went Wrong.Please check the page number correctly!");
        }

        if (theatreResponse.length === 0) {
            throw new NotFoundError("Theatres not found");
        }

        return {
            data: theatreResponse,
            success: true,
            message: "Theatres fetched successfully"
        }

    } catch (error) {

        return {
            data: {},
            success: false,
            error: error,
            message: error.message + "~Repo Layer"

        }
    }
}