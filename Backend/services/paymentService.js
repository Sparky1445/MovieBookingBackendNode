import { ServiceLayerBody } from "../Utils/ServiceLayerBody.js";
import { getPayments as getPaymentsRepo, createPayment as createPaymentRepo } from "../repositories/paymentRepo.js";
import Booking from "../schemas/Booking.js";
import Show from "../schemas/Show.js";
import BadRequestError from "../errors/badRequest.js";
import InternalServerError from "../errors/InternalServerError.js";
export const getPayments = async (userId) => {
    return ServiceLayerBody(getPaymentsRepo, userId);
}

export const createPayment = async (paymentData) => {

    try {
        const booking = await Booking.findById(paymentData.bookingId);
        const show = await Show.findById(booking.showId);


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
