import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
import SuccessBody from "../Utils/SuccessBody.js";
import ErrorBody from "../Utils/ErrorBody.js";
import { getPayments as getPaymentsService, createPayment as createPaymentService } from "../services/paymentService.js";
import Booking from "../schemas/Booking.js";
import mongoose from "mongoose";

export const getPayments = async (req, res) => {
    try {

        const token = jwt.verify(req.cookies.authToken, JWT_SECRET);

        if (token.role === 'ADMIN') {
            var userId = req.body.userId;

            if (!userId) {
                return ErrorBody(res, "User Id is required", 400);
            }

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return ErrorBody(res, "Invalid User Id", 400);
            }


        }

        const paymentRes = (token.role === 'ADMIN') ? await getPaymentsService(userId) : await getPaymentsService(token.userId);

        if (paymentRes.success) {
            return SuccessBody(res, paymentRes.data, paymentRes.message, 200);
        }
        else {
            return ErrorBody(res, paymentRes.error, 500);
        }
    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}

export const createPayment = async (req, res) => {
    try {
        const token = jwt.verify(req.cookies.authToken, JWT_SECRET);
        console.log(token);

        const booking = (token.role === 'ADMIN' || token.role === 'CLIENT') ? await Booking.findById(req.body.bookingId) : await Booking.find({ _id: req.body.bookingId, userId: token.userId });

        if (!booking) {
            return ErrorBody(res, "Booking not found!!!", 404);
        }


        const paymentRes = (token.role === 'ADMIN' || token.role === "CLIENT") ? await createPaymentService({ userId: booking.userId, ...req.body }) : await createPaymentService({ userId: token.userId, ...req.body });

        if (paymentRes.success) {
            return SuccessBody(res, paymentRes.data, paymentRes.message, 200);
        }
        else {
            return ErrorBody(res, paymentRes.error, 500);
        }
    } catch (error) {
        return ErrorBody(res, error, 500);
    }
}

