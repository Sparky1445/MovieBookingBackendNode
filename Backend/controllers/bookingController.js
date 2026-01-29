import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
import { createBooking as createBookingService } from "../services/BookingService.js";
import SuccessBody from "../Utils/SuccessBody.js";
import ErrorBody from "../Utils/ErrorBody.js";
import mongoose from "mongoose";
import { updateBooking as updateBookingService } from "../services/BookingService.js";
import UnauthorizedError from "../errors/Unauthorized.js";
import Booking from "../schemas/Booking.js";
import { cancelBooking as cancelBookingService } from "../services/BookingService.js";
import { getAllBookings as getBookingsService } from "../services/BookingService.js";
import { getBookingsByData as getBookingsByDataService } from "../services/BookingService.js";
import NotFoundError from "../errors/NotFound.js";
import Show from "../schemas/Show.js";


export const createBooking = async (req, res) => {
    try {

        const token = req.cookies.authToken;
        const decodedToken = jwt.verify(token, JWT_SECRET);

        let { noOfSeats, seats, theatreId, movieId, ...omittedBody } = req.body;

        const show = await Show.findById(omittedBody.showId, { showTime: 1, ticketPrice: 1 });

        if (!show) {
            throw new NotFoundError("Show not found");
        }

        noOfSeats = parseInt(noOfSeats);
        console.log(show.ticketPrice);
        const totalCost = parseInt(show.ticketPrice) * noOfSeats;
        const timing = show.showTime;

        seats = seats.split(",").map((seat) => seat.trim());
        movieId = new mongoose.Types.ObjectId(movieId);
        theatreId = new mongoose.Types.ObjectId(theatreId);


        const updatedBody = { ...omittedBody, theatreId, timing, movieId, userId: decodedToken.userId, totalCost, noOfSeats, seats };

        const bookingResponse = await createBookingService(updatedBody);


        if (bookingResponse.success) {
            return SuccessBody(res, bookingResponse.data, "Booking created successfully!", 201);
        }
        else {
            return ErrorBody(res, bookingResponse.error, 401);
        }
    }
    catch (error) {
        return ErrorBody(res, error, 500);
    }
}

export const updateBooking = async (req, res) => {

    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log(id, status);

        const bookingResponse = await updateBookingService(id, status);

        if (bookingResponse.success) {
            return SuccessBody(res, bookingResponse.data, "Booking updated successfully!", 200);
        }
        else {
            return ErrorBody(res, bookingResponse.error, 500);
        }

    } catch (error) {
        return ErrorBody(res, error, 500);
    }

}

export const cancelBooking = async (req, res) => {
    try {
        const bookingId = await Booking.findById(req.params.id, { userId: 1 });
        const token = jwt.verify(req.cookies.authToken, JWT_SECRET);
        const id = req.params.id;
        console.log(id, bookingId.userId.toString(), token.userId);

        if (token.userId !== bookingId.userId.toString()) {
            throw new UnauthorizedError("you are not allowed to cancel this booking!!!");
        }

        const bookingResponse = await cancelBookingService(id);

        if (bookingResponse.success) {
            return SuccessBody(res, bookingResponse.data, "Booking updated successfully!", 200);
        }
        else {
            return ErrorBody(res, bookingResponse.error, 500);
        }


    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}

export const getBookings = async (req, res) => {
    try {
        const token = req.cookies.authToken;
        const decodedToken = jwt.verify(token, JWT_SECRET);

        const userId = decodedToken.userId;

        const bookingResponse = await getBookingsService(userId);

        if (bookingResponse.success) {
            return SuccessBody(res, bookingResponse.data, "Bookings fetched successfully!", 200);
        }
        else {
            return ErrorBody(res, bookingResponse.error, 500);
        }
    } catch (error) {
        return ErrorBody(res, error, 500);
    }

}

export const getBookingsByData = async (req, res) => {
    try {
        const bookingResponse = await getBookingsByDataService(req.params.userId, req.body);

        if (bookingResponse.success) {
            return SuccessBody(res, bookingResponse.data, "Bookings fetched successfully!", 200);
        }
        else {
            return ErrorBody(res, bookingResponse.error, 500);
        }
    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}