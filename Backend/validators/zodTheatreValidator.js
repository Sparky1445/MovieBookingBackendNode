import { ValidationErrorBody } from "../Utils/ValidationErrorBody.js";

export const validateTheatre = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            return ValidationErrorBody(res, error, 400);
        }
    }

}