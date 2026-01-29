import express from "express";
import { createPayment as createPaymentController, getPayments as getPaymentsController } from "../controllers/paymentController.js";
import { isLoggedIn } from "../validators/authValidator.js";
import { zodPaymentValidator } from "../validators/zodPaymentValidator.js";
import { zodPaymentSchema } from "../validators/zodPaymentSchema.js";

const router = express.Router();

router.post("/create", zodPaymentValidator(zodPaymentSchema), isLoggedIn, createPaymentController);
router.get("/", isLoggedIn, getPaymentsController);

export default router;