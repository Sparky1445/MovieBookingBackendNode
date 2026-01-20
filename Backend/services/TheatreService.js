import { createTheatre as createTheatreRepository } from "../repositories/TheatreRepo.js";
import { getTheatreById as getTheatreByIdRepository } from "../repositories/TheatreRepo.js";

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
            message: error + "~Service Layer Error"
        }
    }
}

export const getTheatreById = async (theatreId) => {
    try {

        const theatreResponse = await getTheatreByIdRepository(theatreId);

        console.log(theatreResponse);

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
            message: error + "~Service Layer Error"
        }
    }
}
