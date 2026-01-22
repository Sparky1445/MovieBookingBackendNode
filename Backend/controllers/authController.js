import { login as loginService } from "../services/authService.js";
import ErrorBody from "../Utils/ErrorBody.js";
import SuccessBody from "../Utils/SuccessBody.js";


export const login = async (req, res) => {
    try {
        const tokenRes = await loginService(req.body);
        console.log(tokenRes);

        if (tokenRes) {

            res.cookie("authToken", tokenRes, {
                httpOnly: true,
                secure: false,
                maxAge: (7 * 24 * 60 * 60 * 1000)
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