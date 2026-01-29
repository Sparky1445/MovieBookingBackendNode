import Booking from "../schemas/Booking.js";
import { createPayment as createPaymentRepo } from "./paymentRepo.js";
import BadRequestError from "../errors/badRequest.js";
import InternalServerError from "../errors/InternalServerError.js";
import NotFoundError from "../errors/notFound.js";
import Show from "../schemas/Show.js";

export const createBooking = async (bookingDetails) => {
    try {
        const booking = await Booking.create(bookingDetails);

        if (!booking) {
            throw new InternalServerError("Booking not created!!");
        }

        const show = await Show.findById(booking.showId);
        show.noOfSeats -= booking.noOfSeats;
        await show.save();

        return {
            data: booking,
            success: true,
            message: "Booking created successfully"
        }


    } catch (error) {
        return {
            data: {},
            success: false,
            message: error.message + "~Repo Layer Error",
            error: error
        }
    }
}

export const updateBooking = async (bookingId, status) => {
    try {
        const booking = await Booking.findByIdAndUpdate(bookingId, { status: status }, { new: true });


        if (!booking) {
            throw new Error("Booking not found ~ Repo Layer Error");
        }

        return {
            data: booking,
            success: true,
            message: "Booking updated successfully"
        }

    } catch (error) {
        return {
            data: {},
            success: false,
            message: error.message + "~Repo Layer Error",
            error: error
        }
    }
}

export const cancelBooking = async (bookingId) => {
    try {

        const booking = await Booking.findById(bookingId);

        if (booking.status == "CANCELLED") {
            throw new BadRequestError("The Booking is already cancelled!Thank you");
        }

        const cancelBooking = await Booking.findByIdAndUpdate(bookingId, { status: "CANCELLED" }, { new: true });


        if (!cancelBooking) {
            throw new NotFoundError("No Booking found with the given ID");
        }

        const show = await Show.findById(cancelBooking.showId);
        show.noOfSeats += cancelBooking.noOfSeats;
        await show.save();

        return {
            data: cancelBooking,
            success: true,
            message: "Booking cancelled successfully"
        }

    } catch (error) {
        return {
            data: {},
            success: false,
            message: error.message + "~Repo Layer Error",
            error: error
        }
    }
}

export const getBookings = async (userId) => {
    try {
        const bookings = await Booking.find({ userId: userId });

        if (!bookings) {
            throw new Error("No bookings found with given ID");
        }

        return {
            data: bookings,
            success: true,
            message: "Bookings fetched successfully"
        }

    } catch (error) {
        return {
            data: {},
            success: false,
            message: error.message + "~Repo Layer Error",
            error: error
        }
    }
}

export const getBookingsByData = async (id, bookingData) => {
    try {
        const bookings = await Booking.find({ userId: id, ...bookingData });

        if (!bookings) {
            throw new Error("No bookings found with given Data");
        }

        return {
            data: bookings,
            success: true,
            message: "Bookings fetched successfully"
        }

    } catch (error) {
        return {
            data: {},
            success: false,
            message: error.message + "~Repo Layer Error",
            error: error
        }
    }
}