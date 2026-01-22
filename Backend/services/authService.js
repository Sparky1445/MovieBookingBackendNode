import User from "../schemas/User.js";
import NotFoundError from "../errors/NotFound.js";
import BadRequestError from "../errors/badRequest.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRY } from "../config/serverConfig.js";

export const login = async (authDetails) => {

    const email = authDetails.email;
    const password = authDetails.password;

    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFoundError("No User found with the given credentials!");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log(isPasswordMatched);

    if (!isPasswordMatched) {
        throw new BadRequestError("Invalid Credentials!");
    }

    const userRole = user.role ? user.role : "USER";

    const token = jwt.sign({
        email: user.email, userId: user._id, role: userRole
    }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    })

    return token;
}