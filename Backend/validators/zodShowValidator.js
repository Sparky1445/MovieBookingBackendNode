import { ValidationErrorBody } from "../Utils/ValidationErrorBody.js";

export const zodShowValidator = (zodShowSchema) => {
    return (req, res, next) => {
        try {
            let { showDate, ticketPrice, noOfSeats, ...omittedBody } = req.body;


            const parts = showDate.split('-');

            showDate = new Date(
                +parts[2],
                +parts[1] - 1,
                +parts[0]
            )
            ticketPrice = parseInt(ticketPrice);
            noOfSeats = parseInt(noOfSeats);


            const changedBody = { showDate, ticketPrice, noOfSeats, ...omittedBody };

            zodShowSchema.parse(changedBody);
            next();

            req.body = changedBody;
        } catch (error) {
            return ValidationErrorBody(res, error, 400);
        }
    }



}