import { createBooking as createBookingRepository } from "../repositories/BookingRepo.js";
import { ServiceLayerBody } from "../Utils/ServiceLayerBody.js";
import Movie from "../schemas/Movie.js";
import Theatre from "../schemas/Theatre.js";
import NotFoundError from "../errors/NotFound.js";
import Booking from "../schemas/Booking.js";
import BadRequestError from "../errors/badRequest.js";
import { updateBooking as updateBookingRepository } from "../repositories/BookingRepo.js";
import { cancelBooking as cancelBookingRepository } from "../repositories/BookingRepo.js";
import { getBookings as getBookingsRepository } from "../repositories/BookingRepo.js";
import { getBookingsByData as getBookingsByDataRepository } from "../repositories/BookingRepo.js";

export const createBooking = async (bookingDetails) => {
    try {

        const checkMovie = await Theatre.find({ _id: bookingDetails.theatreId, movies: { $in: bookingDetails.movieId } })

        if (checkMovie.length === 0) {
            throw new NotFoundError(`The requested Movie is not available at this Theatre`);
        }



        const movie = await Movie.findById(bookingDetails.movieId);

        if (!movie) {
            throw new NotFoundError(`Movie ${bookingDetails.movieId} is Invalid`);
        }

        const theatre = await Theatre.findById(bookingDetails.theatreId);
        if (!theatre) {
            throw new NotFoundError(`Theatre ${bookingDetails.theatreId} is Invalid`);
        }

        if (bookingDetails.noOfSeats != (bookingDetails.seats.length)) {
            throw new BadRequestError("No of seats and seats length doesn't match");
        }

        const bookedSeatsIssue = [];

        for (const seat of bookingDetails.seats) {
            const count = await Booking.countDocuments({ $or: [{ status: "CONFIRMED" }, { status: "IN_PROGRESS" }], movieId: bookingDetails.movieId, theatreId: bookingDetails.theatreId, timing: bookingDetails.timing, seats: seat });
            if (count > 0) {
                bookedSeatsIssue.push(seat);
            }
        }


        if (bookedSeatsIssue.length > 0) {
            throw new BadRequestError(`Seats ${bookedSeatsIssue.join(", ")} are already booked!`);
        }



        return ServiceLayerBody(createBookingRepository, bookingDetails);
    } catch (error) {
        return {
            success: false,
            data: {},
            error: error,
            message: error.message + "~Service layer Error"
        }
    }
}

export const updateBooking = async (bookingId, status) => {
    return ServiceLayerBody(updateBookingRepository, bookingId, status);
}

export const cancelBooking = async (bookingId) => {
    return ServiceLayerBody(cancelBookingRepository, bookingId);
}

export const getAllBookings = async (userId) => {
    return ServiceLayerBody(getBookingsRepository, userId);
}

export const getBookingsByData = async (id, bookingData) => {
    return ServiceLayerBody(getBookingsByDataRepository, id, bookingData);
}