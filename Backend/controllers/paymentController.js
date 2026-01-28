import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import SuccessBody from "../Utils/SuccessBody.js";
import ErrorBody from "../Utils/ErrorBody.js";
import { getPayments as getPaymentsService, createPayment as createPaymentService } from "../services/paymentService.js";


export const getPayments = async (req, res) => {
    try {
        const { userId } = req.body;
        const token = jwt.verify(req.cookies.token, JWT_SECRET);

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
        const paymentRes = await createPaymentService(req.body);

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

