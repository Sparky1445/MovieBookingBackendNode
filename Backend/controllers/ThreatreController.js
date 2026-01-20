import { createTheatre as createTheatreService } from "../services/TheatreService.js";
import { getTheatreById as getTheatreByIdService } from "../services/TheatreService.js";
import { getAllTheatres as getAllTheatresService } from "../services/TheatreService.js";
import { deleteTheatre as deleteTheatreService } from "../services/TheatreService.js";
import { updateTheatre as updateTheatreService } from "../services/TheatreService.js";
import SuccessBody from "../Utils/SuccessBody.js";
import ErrorBody from "../Utils/ErrorBody.js";

export const createTheatre = async (req, res) => {
    try {
        const theatreResponse = await createTheatreService(req.body);



        if (theatreResponse.success) {
            return SuccessBody(res, theatreResponse.data, theatreResponse.message, 201);
        }
        else if (!theatreResponse.success) {
            return ErrorBody(res, theatreResponse.error, 400);
        }


    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}

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

export const getAllTheatres = async (req, res) => {
    try {
        const theatreResponse = await getAllTheatresService();

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
            return SuccessBody(res, theatreResponse.data, theatreResponse.message, 200);
        }
        else if (!theatreResponse.success) {
            return ErrorBody(res, theatreResponse.error, 500);
        }
    } catch (err) {
        return ErrorBody(res, err, 500);
    }
}

export const deleteTheatre = async (req, res) => {
    try {
        const theatreResp = await deleteTheatreService(req.params.id);

        if (theatreResp.success) {
            return SuccessBody(res, theatreResp.data, theatreResp.message, 200);
        }
        else if (!theatreResp.success) {
            return ErrorBody(res, theatreResp.error, 500);
        }

    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}