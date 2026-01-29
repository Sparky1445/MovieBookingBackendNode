import { success } from "zod";
import BadRequestError from "../errors/badRequest.js";
import User from "../schemas/User.js";
import mongoose from "mongoose";
import { sendEmail } from "../services/emailService.js";

export const signup = async (userData) => {
    try {
        const user = await User.create(userData);

        if (!user) {
            throw new BadRequestError("Failed to create User!Try again");
        }

        sendEmail("Welcome to CinePlix", `Hello ${user.firstName + " " + user.lastName}, Welcome to CinePlix! The most trusted platform for movie booking and premium Movie experience! For the best movie experience, download the CinePlix app now and get upto 50% discount on your first booking!`, user.email);

        return {
            success: true,
            data: user,
            message: "User created Successfully!"
        }

    } catch (err) {
        return {
            success: false,
            data: {},
            error: err,
            message: err.message + "~Repo layer Error"
        }
    }
}

export const getUserByEmail = async (email) => {
    try {
        if (!email) {
            throw new BadRequestError("Email is required!");
        }
        const user = await User.findOne({ email });

        if (!user) {
            throw new BadRequestError("No User found with the given Email!");
        }

        return {
            success: true,
            data: user,
            message: "User found Successfully!"
        }

    } catch (err) {
        return {
            success: false,
            data: {},
            error: err,
            message: err.message + "~Repo layer Error"
        }
    }
}

export const getUserById = async (userId) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new BadRequestError("Invalid User ID!");
        }

        const user = await User.findById(userId);

        if (!user) {
            throw new BadRequestError("No User found with the given ID!");
        }

        return {
            success: true,
            data: user,
            message: "User found Successfully!"
        }

    } catch (err) {
        return {
            success: false,
            data: {},
            error: err,
            message: err.message + "~Repo layer Error"
        }
    }
}

export const updateUser = async (userId, data) => {
    try {
        const user = await User.findByIdAndUpdate(userId, data, { new: true });

        if (!user) {
            throw new BadRequestError("No User found with the given ID!");
        }

        sendEmail("User updated successfully!", `Your user profile has been updated successfully!
            The updated data is as follows:
            ${JSON.stringify(data)}.
            If this was not you, please contact us at support@cineplix.com`, user.email);

        return {
            success: true,
            data: user,
            message: "User updated Successfully!"
        }

    } catch (err) {
        return {
            success: false,
            data: {},
            error: err,
            message: err.message + "~Repo layer Error"
        }
    }
}