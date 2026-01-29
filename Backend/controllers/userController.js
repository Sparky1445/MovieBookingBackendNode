import ErrorBody from "../Utils/ErrorBody.js"
import SuccessBody from "../Utils/SuccessBody.js";
import { getUserByEmail as getUserByEmailService } from "../services/userService.js"
import { getUserById as getUserByIdService } from "../services/userService.js"
import { updateUser as updateUserService } from "../services/userService.js"
import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/Unauthorized.js";


export const getUserByEmail = async (req, res) => {
    try {
        const response = await getUserByEmailService(req.params.email);

        if (response.success) {
            return SuccessBody(res, response.data, response.message, 200);
        } else if (!response.success) {
            return ErrorBody(res, response.error, 404);
        }

    } catch (err) {

        return ErrorBody(res, err, 500);
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await getUserByIdService(req.params.userId);

        if (response.success) {
            return SuccessBody(res, response.data, response.message, 200);
        } else if (!response.success) {
            return ErrorBody(res, response.error, 404);
        }

    } catch (err) {

        return ErrorBody(res, err, 500);
    }
}


export const updateUser = async (req, res) => {
    try {
        const token = req.cookies?.authToken;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (decodedToken.userId != req.params.userId && decodedToken.role != "ADMIN") {
            throw new UnauthorizedError("Unauthorized");
        }


        const response = await updateUserService(req.params.userId, req.body);

        if (response.success) {
            return SuccessBody(res, response.data, response.message, 200);
        } else if (!response.success) {
            return ErrorBody(res, response.error, 404);
        }

    } catch (err) {
        return ErrorBody(res, err, 500);
    }
}