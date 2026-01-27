import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import { validateBooking } from "../validators/zodBookingValidator.js";
import bookingSchema from "../validators/zodBookingSchema.js";
const Router = express.Router();

Router.post("/create", validateBooking(bookingSchema), createBooking);

export default Router;
