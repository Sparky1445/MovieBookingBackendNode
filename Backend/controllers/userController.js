import ErrorBody from "../Utils/ErrorBody.js"
import SuccessBody from "../Utils/SuccessBody.js";
import { createUser as createUserService } from "../services/userService.js"

export const createUser = async (req, res) => {
    try {
        const response = await createUserService(req.body);

        if (response.success) {
            return SuccessBody(res, response.data, response.message, 201);
        } else if (!response.success) {
            return ErrorBody(res, response.error, 400);
        }

    } catch (err) {
        return ErrorBody(res, err, 500);
    }
}