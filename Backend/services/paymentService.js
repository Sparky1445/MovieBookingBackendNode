import { ServiceLayerBody } from "../Utils/ServiceLayerBody.js";
import { getPayments as getPaymentsRepo } from "../repositories/paymentRepo.js";

export const getPayments = async (userId) => {
    return ServiceLayerBody(getPaymentsRepo, userId);
}

export const createPayment = async (paymentData) => {
    return ServiceLayerBody(createPaymentRepo, paymentData);
}