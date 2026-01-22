import { success } from "zod";
import BadRequestError from "../errors/badRequest.js";
import User from "../schemas/User.js";

export const createUser = async (userData) => {
    try {
        const user = await User.create(userData);

        if (!user) {
            throw new BadRequestError("Failed to create User!Try again");
        }

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