import mongoose from "mongoose";
import { z } from "zod";

export const zodPaymentSchema = z.object({
    bookingId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid booking ID"
    }),
    amount: z.number(),
    status: z.enum(["pending", "success", "failed"]),
})

