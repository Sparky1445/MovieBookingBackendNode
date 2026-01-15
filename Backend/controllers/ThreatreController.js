import { createTheatre as createTheatreService } from "../services/TheatreService.js";
import SuccessBody from "../Utils/SuccessBody.js";
import ErrorBody from "../Utils/ErrorBody.js";
import BadRequestError from "../errors/badRequest.js";

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