import { login as loginService } from "../services/authService.js";
import ErrorBody from "../Utils/ErrorBody.js";
import SuccessBody from "../Utils/SuccessBody.js";
import { signup as signUpService } from "../services/authService.js"
import { resetPassword as resetPasswordService } from "../services/authService.js"
import { JWT_SECRET } from "../config/serverConfig.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const response = await signUpService(req.body);

        if (response.success) {
            return SuccessBody(res, response.data, response.message, 201);
        } else if (!response.success) {
            return ErrorBody(res, response.error, 400);
        }

    } catch (err) {
        return ErrorBody(res, err, 500);
    }
}


export const login = async (req, res) => {
    try {
        const tokenRes = await loginService(req.body);
        console.log(tokenRes);

        if (tokenRes) {

            res.cookie("authToken", tokenRes, {
                httpOnly: true,
                secure: false,
                maxAge: (0.01 * 24 * 60 * 60 * 1000)
            });

            return SuccessBody(res, tokenRes, "Logged In Successfully!", 200);
        }
        else {
            return ErrorBody(res, tokenRes, 401)
        }
    } catch (err) {
        return ErrorBody(res, err, 500);
    }
}

export const resetPassword = async (req, res) => {
    try {

        const cookie = req.cookies?.authToken;

        if (!cookie) {
            return ErrorBody(res, "Please Login First!", 400);
        }

        let tokenRes;

        try {
            tokenRes = await jwt.verify(cookie, JWT_SECRET);
        } catch (err) {
            return ErrorBody(res, "Invalid Token!", 500);
        }

        const response = await resetPasswordService(tokenRes.userId, req.body);

        if (response.success) {
            return SuccessBody(res, response.data, response.message, 200);
        } else if (!response.success) {
            return ErrorBody(res, response.error, 400);
        }
    } catch (err) {
        return ErrorBody(res, err, 500);
    }
}