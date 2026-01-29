import { ServiceLayerBody } from "../Utils/ServiceLayerBody.js";
import { getPayments as getPaymentsRepo, createPayment as createPaymentRepo } from "../repositories/paymentRepo.js";
import Booking from "../schemas/Booking.js";
import Show from "../schemas/Show.js";
import BadRequestError from "../errors/badRequest.js";
import InternalServerError from "../errors/InternalServerError.js";
import { sendEmail } from "./emailService.js";
import Movie from "../schemas/Movie.js";
import Theatre from "../schemas/Theatre.js";
import User from "../schemas/User.js";


export const getPayments = async (userId) => {
    return ServiceLayerBody(getPaymentsRepo, userId);
}

export const createPayment = async (paymentData) => {

    try {
        const booking = await Booking.findById(paymentData.bookingId);
        const show = await Show.findById(booking.showId);
        const movie = await Movie.findById(booking.movieId);
        const theatre = await Theatre.findById(booking.theatreId);
        const user = await User.findById(booking.userId);


        if (booking.status == "CONFIRMED" || booking.status == "CANCELLED") {
            throw new InternalServerError("Cant make new payment against this booking!");
        }

        if (parseInt(booking.totalCost) !== parseInt(paymentData.amount)) {
            throw new BadRequestError("Invalid amount!!!");
        }


        let bookingTime = booking.createdAt;
        let currentTime = Date.now();

        let minutes = Math.floor(((currentTime - bookingTime) / 1000) / 60);

        if (minutes > 5) {
            booking.status = 'CANCELLED';
            await booking.save();

            sendEmail("Booking has been cancelled", `Your booking for the movie ${movie.name} in ${theatre.name} on ${show.showDate} at ${show.showTime} for ${cancelBooking.noOfSeats} seats[${cancelBooking.seats.map((seat) => seat).join(",")}] has been cancelled due to late payment!! Kindly book again`, user.email);

            show.noOfSeats += booking.noOfSeats;
            await show.save();

            throw new BadRequestError("Booking time expired!!!");

        }

        return ServiceLayerBody(createPaymentRepo, paymentData);

    } catch (error) {
        return {
            success: false,
            data: {},
            error: error,
            message: error.message + "~Service layer Error"
        }
    }
}
