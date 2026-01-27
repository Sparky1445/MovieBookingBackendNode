import { z } from "zod";
import mongoose from "mongoose";

const bookingSchema = z.object({
    movieId: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), "Invalid Movie ID"),
    theatreId: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), "Invalid Theatre ID"),
    timing: z.string(),
    seats: z.array(z.string()).min(1, "At least one seat is required"),
    noOfSeats: z.number().min(1, "At least one seat is required"),
    totalCost: z.number().min(0, "Total cost cannot be negative"),
    status: z.enum(["IN_PROGRESS", "CONFIRMED", "CANCELLED"], { default: "IN_PROGRESS", message: "Status can only be IN_PROGRESS, CONFIRMED or CANCELLED" })
})

export default bookingSchema;

export const updateBookingSchema = bookingSchema.omit({
    movieId: true,
    theatreId: true,
    timing: true,
    seats: true,
    noOfSeats: true,
}).partial().strict();
