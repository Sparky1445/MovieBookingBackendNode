import { ValidationErrorBody } from "../Utils/ValidationErrorBody.js";

const validator = (schema) => {
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

export default validator;
