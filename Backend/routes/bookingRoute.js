import express from "express";
import { createBooking as createBookingController } from "../controllers/bookingController.js";
import { validateBooking } from "../validators/zodBookingValidator.js";
import bookingSchema from "../validators/zodBookingSchema.js";
import { updateBookingSchema } from "../validators/zodBookingSchema.js";
import { updateBooking as updateBookingController } from "../controllers/bookingController.js";
import { isAdminOrClient, isLoggedIn } from "../validators/authValidator.js";
import { validateBookingUpdation } from "../validators/zodBookingValidator.js";
import { cancelBooking as cancelBookingController } from "../controllers/bookingController.js";
import { getBookings as getBookingsController } from "../controllers/bookingController.js";
import { getBookingsByData as getBookingsByDataController } from "../controllers/bookingController.js";
import { isAdmin } from "../validators/authValidator.js";


const Router = express.Router();

Router.post("/create", isLoggedIn, validateBooking(bookingSchema), createBookingController);
Router.patch("/:id", isLoggedIn, isAdminOrClient, validateBookingUpdation(updateBookingSchema), updateBookingController);
Router.patch("/cancel/:id", isLoggedIn, cancelBookingController);
Router.get("/", isLoggedIn, getBookingsController);
Router.get("/:userId", isLoggedIn, isAdmin, getBookingsByDataController);

export default Router;
