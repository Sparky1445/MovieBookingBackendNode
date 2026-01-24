import User from "../schemas/User.js";
import NotFoundError from "../errors/NotFound.js";
import UnauthorizedError from "../errors/Unauthorized.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import InternalServerError from "../errors/InternalServerError.js";
import { JWT_SECRET, JWT_EXPIRY } from "../config/serverConfig.js";
import { ServiceLayerBody } from "../Utils/ServiceLayerBody.js"
import BadRequestError from "../errors/badRequest.js";
import { signup as signupRepository } from "../repositories/userRepo.js"
import mongoose from "mongoose";


export const signup = async (userData) => {
    return ServiceLayerBody(signupRepository, userData);

}

export const login = async (authDetails) => {

    const email = authDetails.email;
    const password = authDetails.password;

    if (!email || !password) {
        throw new BadRequestError("Email and Password are required!");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFoundError("No User found with the given Email!");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new UnauthorizedError("Invalid Password for given Email!");
    }

    const userRole = user.role ? user.role : "USER";

    const token = jwt.sign({
        email: user.email, userId: user._id, role: userRole
    }, JWT_SECRET, {
        expiresIn: '1h'
    })

    return token;


}

export const resetPassword = async (userId, authDetails) => {
    try {
        if (!authDetails.prevPassword || !authDetails.newPassword) {
            throw new BadRequestError("Previous Password and New Password are required!");
        }

        if (authDetails.prevPassword === authDetails.newPassword) {
            throw new BadRequestError("New Password cannot be same as Previous Password!");
        }


        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new BadRequestError("Invalid User ID!");
        }


        const user = await User.findOne({ _id: userId });

        if (!user) {
            throw new NotFoundError("No User found with the given ID!");
        }


        if (authDetails.newPassword.length < 8) {
            throw new BadRequestError("New Password must be at least 8 characters long!");
        }


        const isPasswordMatched = await bcrypt.compare(authDetails.prevPassword, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedError("Invalid Password for given ID!");
        }

        user.password = authDetails.newPassword;

        await user.save();

        return {
            success: true,
            data: user,
            message: "Password Reset Successfully!"
        }

    } catch (error) {
        return {
            success: false,
            data: {},
            error: error,
            message: error.message + "~Service layer Error"
        }
    }
}
