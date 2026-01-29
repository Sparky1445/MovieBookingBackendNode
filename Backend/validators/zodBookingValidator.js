import { updateBooking } from "../repositories/BookingRepo.js";
import { ValidationErrorBody } from "../Utils/ValidationErrorBody.js";

export const validateBooking = (bookingSchema) => {
    return (req, res, next) => {
        try {
            let { noOfSeats, seats, ...omittedBody } = req.body;


            noOfSeats = parseInt(noOfSeats);
            seats = seats.split(",").map((seat) => seat.trim());

            const updatedBody = { ...omittedBody, noOfSeats, seats };
            bookingSchema.parse(updatedBody);
            next();


        } catch (error) {
            return ValidationErrorBody(res, error, 400);
        }

    }
}

export const validateBookingUpdation = (updateBookingSchema) => {
    return (req, res, next) => {
        try {
            updateBookingSchema.parse(req.body);
            next();

        } catch (error) {
            return ValidationErrorBody(res, error, 400);
        }
    }
}