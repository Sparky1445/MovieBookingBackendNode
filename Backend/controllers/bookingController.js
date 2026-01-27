import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
import { createBooking as createBookingService } from "../services/BookingService.js";
import SuccessBody from "../Utils/SuccessBody.js";
import ErrorBody from "../Utils/ErrorBody.js";
import mongoose from "mongoose";
import Theatre from "../schemas/Theatre.js";
import NotFoundError from "../errors/NotFound.js";


export const createBooking = async (req, res) => {

    const token = req.cookies.authToken;

    if (!token) {
        return ErrorBody(res, "Please Login First!", 401);
    }



    const decodedToken = jwt.verify(token, JWT_SECRET);

    let { totalCost, noOfSeats, seats, theatreId, movieId, ...omittedBody } = req.body;


    totalCost = parseInt(totalCost);
    noOfSeats = parseInt(noOfSeats);
    seats = seats.split(",").map((seat) => seat.trim());
    movieId = new mongoose.Types.ObjectId(movieId);
    theatreId = new mongoose.Types.ObjectId(theatreId);


    const updatedBody = { ...omittedBody, theatreId, movieId, userId: decodedToken.userId, totalCost, noOfSeats, seats };

    const bookingResponse = await createBookingService(updatedBody);


    if (bookingResponse.success) {
        return SuccessBody(res, bookingResponse.data, "Booking created successfully!", 201);
    }
    else {
        return ErrorBody(res, bookingResponse.error, 500);
    }
}