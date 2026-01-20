import z from "zod";


const theatreSchema = z.object({
    name: z.string().min(3, "Theatre name must be at least 3 characters long"),
    address: z.string().min(3, "Theatre address must be at least 3 characters long"),
    city: z.string().min(3, "Theatre city must be at least 3 characters long"),
    pincode: z.string().min(5, "Theatre pincode must be at least 5 digits long"),
    description: z.string().min(100, "Theatre description must be at least 100 characters long"),

})

export default theatreSchema;

export const updateTheatreSchema = theatreSchema.partial().strict();
