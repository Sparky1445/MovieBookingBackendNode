import { createTheatre as createTheatreRepository } from "../repositories/TheatreRepo.js";
import { getTheatreById as getTheatreByIdRepository } from "../repositories/TheatreRepo.js";
import { getAllTheatres as getAllTheatresRepository } from "../repositories/TheatreRepo.js";
import { deleteTheatre as deleteTheatreRepository } from "../repositories/TheatreRepo.js";
import { updateTheatre as updateTheatreRepository } from "../repositories/TheatreRepo.js";

export const createTheatre = async (theatreData) => {
    try {
        const theatreResponse = await createTheatreRepository(theatreData);

        if (theatreResponse.success) {
            return theatreResponse;
        }
        else {
            return {
                success: false,
                error: theatreResponse.error,
                message: theatreResponse.message
            }
        }

    } catch (error) {
        return {
            success: false,
            error: error,
            message: error + "~Service  Error"
        }
    }
}

export const getTheatreById = async (theatreId) => {
    try {

        const theatreResponse = await getTheatreByIdRepository(theatreId);


        if (theatreResponse.success) {
            return theatreResponse;
        }
        else if (!theatreResponse.success) {
            return {
                success: false,
                error: theatreResponse.error,
                message: theatreResponse.message
            }
        }

    } catch (error) {
        return {
            success: false,
            error: error,
            message: error + "~Service  Error"
        }
    }
}

export const getAllTheatres = async () => {
    try {
        const theatreResponse = await getAllTheatresRepository();
        console.log(theatreResponse);

        if (theatreResponse.success) {
            return theatreResponse;
        }
        else {
            return {
                success: false,
                error: theatreResponse.error,
                message: theatreResponse.message
            }
        }

    }
    catch (error) {
        return {
            success: false,
            error: error,
            message: error + "~Service Error"
        }
    }

}

export const updateTheatre = async (id, theatreData) => {
    try {
        const theatreResponse = await updateTheatreRepository(id, theatreData);

        if (theatreResponse.success) {
            return theatreResponse;
        }
        else {
            return {
                success: false,
                error: theatreResponse.error,
                message: theatreResponse.message
            }
        }
    } catch (error) {
        return {
            success: false,
            error: error,
            message: error + "~Service Error"
        }
    }
}


export const deleteTheatre = async (id) => {
    try {
        const theatreResponse = await deleteTheatreRepository(id);

        if (theatreResponse.success) {
            return theatreResponse;
        }
        else {
            return {
                success: false,
                error: theatreResponse.error,
                message: theatreResponse.message
            }
        }
    } catch (error) {
        return {
            success: false,
            error: error,
            message: error + "~Service Error"
        }
    }
}