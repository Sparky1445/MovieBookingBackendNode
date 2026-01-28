import { ValidationErrorBody } from "../Utils/ValidationErrorBody.js";

export const zodPaymentValidator = (schema) => {
    return (req, res, next) => {
        try {
            let { amount, ...remainingBody } = req.body;
            amount = parseInt(amount);

            const updatedBody = { amount, ...remainingBody };

            schema.parse(updatedBody);
            next();
        }
        catch (error) {
            return ValidationErrorBody(res, error, 400);
        }
    }
}