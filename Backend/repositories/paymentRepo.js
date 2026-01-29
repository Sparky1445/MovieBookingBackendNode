import NotFoundError from "../errors/NotFound.js";
import InternalServerError from "../errors/InternalServerError.js";
import BadRequestError from "../errors/badRequest.js";
import Payment from "../schemas/Payment.js";
import Booking from "../schemas/Booking.js";
import mongoose from "mongoose";
import User from "../schemas/User.js"
import Show from "../schemas/Show.js"

export const getPayments = async (userId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new NotFoundError("Invalid user Id!!");
        }

        const user = await User.findById(userId);

        if (!user) {
            throw new NotFoundError("User does not exist!!");
        }

        const payments = await Payment.find({ userId }).populate(
            {
                path: ['bookingId', 'userId'],

                strictPopulate: false
            }
        );

        if (!payments) {
            throw new NotFoundError("Uhhu!!No payments found for this user, Lets get you onboard");
        }

        return {
            success: true,
            message: "Payments fetched successfully",
            data: payments
        }

    } catch (error) {

        return {
            success: false,
            data: {},
            message: "Failed to fetch payments",
            error: error
        }
    }
}

export const createPayment = async (paymentData) => {
    try {
        const booking = await Booking.findById(paymentData.bookingId);
        const show = await Show.findById(booking.showId);

        const payment = await Payment.create(paymentData);

        if (!payment) {

            booking.status = "CANCELLED";
            await booking.save();

            show.noOfSeats += booking.noOfSeats;
            await show.save();

            throw new InternalServerError("Failed to create payment");
        }


        payment.status = "success";
        await payment.save();

        if (booking.status == "IN_PROGRESS" && booking.totalCost == payment.amount) {
            booking.status = "CONFIRMED";
            await booking.save();
        }

        return {
            success: true,
            message: "Payment created successfully",
            data: payment
        }


    } catch (error) {
        return {
            success: false,
            data: {},
            message: "Failed to create payment",
            error: error
        }
    }
}

