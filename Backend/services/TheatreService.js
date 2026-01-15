import { createTheatre as createTheatreRepository } from "../repositories/TheatreRepo.js";

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
