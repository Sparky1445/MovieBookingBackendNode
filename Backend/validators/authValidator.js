import { JWT_SECRET } from "../config/serverConfig.js";
import jwt from "jsonwebtoken";
import ErrorBody from "../Utils/ErrorBody.js";



export const isLoggedIn = async (req, res, next) => {


    const token = req.cookies.authToken;

    if (!token) {
        return ErrorBody(res, "Please Login First!", 400);
    }



    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            return ErrorBody(res, "Unauthorized! Please Login First!", 401);
        }

        req.user = {
            email: decoded.email,
            userId: decoded.userId,
            role: decoded.role
        }

        next();


    } catch (error) {
        return ErrorBody(res, "Invalid Token!", 500);
    }
}

export const isAdmin = async (req, res, next) => {
    const token = req.cookies?.authToken;

    if (!token) {
        return ErrorBody(res, "Please Login First!", 400);
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role != "ADMIN") {
        return ErrorBody(res, "Unauthorized! You are not an Admin!", 401);
    }
    next();
}

export const isClient = async (req, res, next) => {
    const token = req.cookies?.authToken;

    if (!token) {
        return ErrorBody(res, "Please Login First!", 400);
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role != "CLIENT") {
        return ErrorBody(res, "Unauthorized! You are not a Client!", 401);
    }
    next();
}

export const isAdminOrClient = async (req, res, next) => {
    const token = req.cookies?.authToken;

    if (!token) {
        return ErrorBody(res, "Please Login First!", 400);
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role != "ADMIN" && decoded.role != "CLIENT") {
        return ErrorBody(res, "Unauthorized! You are not a Admin or Client!", 401);
    }
    next();
}
