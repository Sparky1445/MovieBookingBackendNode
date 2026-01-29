import { createTheatre as createTheatreService } from "../services/TheatreService.js";
import { getTheatreById as getTheatreByIdService } from "../services/TheatreService.js";
import { getAllTheatres as getAllTheatresService } from "../services/TheatreService.js";
import { deleteTheatre as deleteTheatreService } from "../services/TheatreService.js";
import { updateTheatre as updateTheatreService } from "../services/TheatreService.js";
import { modifyMoviesInTheatre as modifyMoviesInTheatreService } from "../services/TheatreService.js";
import { getTheatresByMovieId as getTheatresByMovieIdService } from "../services/TheatreService.js";
import { getMoviesInTheatre as getMoviesInTheatreService } from "../services/TheatreService.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
import SuccessBody from "../Utils/SuccessBody.js";
import ErrorBody from "../Utils/ErrorBody.js";
import { queryResolver } from "../Utils/queryResolver.js";
import { sendEmail } from "../services/emailService.js";
import User from "../schemas/User.js";




/**
 * @description -> Controller for creating a new theatre
 * @param {*} req 
 * @param {*} res Object of created Theatre
 */

export const createTheatre = async (req, res) => {
    try {
        const decodedToken = jwt.verify(req.cookies.authToken, JWT_SECRET);
        const theatreResponse = await createTheatreService(req.body);

        const user = await User.findById(decodedToken.userId);




        if (theatreResponse.success) {
            if (user.role === "CLIENT") {
                sendEmail("Theatre created successfully!", `Hello ${user.firstName}, Welcome to CinePlix Client! As a client you can now create theatres and manage them on CinePlix! Lets get you Onboarded!
                    Here are your theatre details : ${{
                        name: theatreResponse.data.name,
                        description: theatreResponse.data.description,
                        address: theatreResponse.data.address,
                        city: theatreResponse.data.city,
                        zip: theatreResponse.data.pincode,
                        createdAt: theatreResponse.data.createdAt,
                    }}`, user.email);
            }
            return SuccessBody(res, theatreResponse.data, theatreResponse.message, 201);
        }
        else if (!theatreResponse.success) {
            if (user.role === "CLIENT") {
                sendEmail("Theatre creation failed!", `Hello ${user.firstName}, Your theatre creation request has been rejected! Please try again!`, user.email);
            }
            return ErrorBody(res, theatreResponse.error, 400);
        }


    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}

/**
 * @description -> Controller for getting a theatre by ID
 * @param {*} req 
 * @param {*} res 
 * @returns -> Searched Theatre
 */

export const getTheatreById = async (req, res) => {
    try {
        const theatreResponse = await getTheatreByIdService(req.params.id);

        if (theatreResponse.success) {
            return SuccessBody(res, theatreResponse.data, theatreResponse.message, 200);
        }
        else if (!theatreResponse.success) {
            return ErrorBody(res, theatreResponse.error, 404);
        }

    }
    catch (err) {
        return ErrorBody(res, err, 500);
    }
}

/**
 * @description -> Controller for getting all the theatres
 * @param {*} req 
 * @param {*} res 
 * @returns -> Array of Theatres
 */

export const getAllTheatres = async (req, res) => {
    try {
        let query = queryResolver(req.query);


        const theatreResponse = await getAllTheatresService(query);

        if (theatreResponse.success) {
            return SuccessBody(res, theatreResponse.data, theatreResponse.message, 200);
        }
        else if (!theatreResponse.success) {
            return ErrorBody(res, theatreResponse.error, 500);
        }

    } catch (err) {
        return ErrorBody(res, err, 500);
    }
}

export const updateTheatre = async (req, res) => {
    try {
        const theatreResponse = await updateTheatreService(req.params.id, req.body);

        if (theatreResponse.success) {
            if (user.role === "CLIENT") {
                sendEmail(`Theatre updated successfully!`, `Hello ${user.firstName}, Your theatre has been updated successfully!\n 
                    the Updated details for the theatre are : ${{ ...theatreResponse.data }}`, user.email);
            }
            return SuccessBody(res, theatreResponse.data, theatreResponse.message, 200);
        }
        else if (!theatreResponse.success) {
            if (user.role === "CLIENT") {
                sendEmail("Theatre update failed!", `Hello ${user.firstName}, Your theatre update request has been rejected!`, user.email);
            }
            return ErrorBody(res, theatreResponse.error, 404);
        }
    } catch (err) {
        return ErrorBody(res, err, 500);
    }
}

/**
 * @description -> Controller for deleting a theatre
 * @param {*} req 
 * @param {*} res 
 * @returns -> Object of deleted Theatre
 */

export const deleteTheatre = async (req, res) => {
    try {
        const theatreResp = await deleteTheatreService(req.params.id);

        if (theatreResp.success) {
            if (User.role === "CLIENT") {
                sendEmail(`Theatre deleted successfully!`, `Hello ${User.name}, Your theatre has been deleted successfully!\n 
                It was great working with you!`, User.email);
            }
            return SuccessBody(res, theatreResp.data, theatreResp.message, 200);
        }
        else if (!theatreResp.success) {
            if (User.role === "CLIENT") {
                sendEmail("Theatre deletion failed!", `Hello ${User.name}, Your theatre deletion request has been rejected!`, User.email);
            }
            return ErrorBody(res, theatreResp.error, 500);
        }

    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}

export const updateMoviesInTheatre = async (req, res) => {

    try {


        const theatreResponse = await modifyMoviesInTheatreService(req.params.id, req.body.movieIds, req.body.operation);

        if (theatreResponse.success) {
            return SuccessBody(res, theatreResponse.data, theatreResponse.message, 200);
        }
        else if (!theatreResponse.success) {
            return ErrorBody(res, theatreResponse.error, 404);
        }
    } catch (err) {
        console.log(err);
        return ErrorBody(res, err, 500);
    }
}

export const getTheatresByMovieId = async (req, res) => {
    try {
        const query = queryResolver(req.query);
        const response = await getTheatresByMovieIdService(req.params.id, query);

        if (response.success) {
            return SuccessBody(res, response.data, "Theatres fetched Successfully!", 200);
        }
        else {
            return ErrorBody(res, response.error, 500);
        }


    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}

export const getMoviesInTheatre = async (req, res) => {
    try {
        const query = queryResolver(req.query);
        const response = await getMoviesInTheatreService(req.params.id, query);

        if (response.success) {
            return SuccessBody(res, response.data, "Movies fetched Successfully!", 200);
        }
        else {
            return ErrorBody(res, response.error, 500);
        }

    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}