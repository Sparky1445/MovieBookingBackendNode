import NotFoundError from "../Utils/ErrorBody.js";
import InternalServerError from "../Utils/ErrorBody.js";
import Payment from "../schemas/Payment.js";
import Booking from "../schemas/Booking.js";
import mongoose from "mongoose";

export const getPayments = async (userId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new NotFoundError("Invalid user Id!!");
        }

        const User = await User.findById(userId);

        if (!User) {
            throw new NotFoundError("User does not exist!!");
        }

        const payments = await Payment.find({ userId });

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
        const payment = await Payment.create(paymentData);

        if (!payment) {

            const booking = await Booking.findById(paymentData.bookingId);
            booking.status = "CANCELLED";
            await booking.save();

            throw new InternalServerError("Failed to create payment");
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

