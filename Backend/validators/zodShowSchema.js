import { z } from "zod";
import mongoose from "mongoose";

const zodShowSchema = z.object({
    movieId: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), "Invalid Movie ID"),
    theatreId: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), "Invalid Theatre ID"),
    showDate: z.date().min(1, "Show Date is invalid or empty"),
    showTime: z.string().min(5, "Show Time is invalid or empty"),
    ticketPrice: z.number().min(1, "Ticket Price is invalid or empty"),
    noOfSeats: z.number().min(100, "No of Seats is invalid or empty"),
    format: z.enum(["2D", "3D", "IMAX"], { default: "2D", message: "Format can only be 2D, 3D or IMAX" }).optional()

})

export default zodShowSchema