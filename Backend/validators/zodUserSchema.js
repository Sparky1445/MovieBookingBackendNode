import { z } from 'zod';

const zodUserSchema = z.object({
    firstName: z.string().min(1, 'First name is required').max(20, 'First name must be less than 20 characters'),
    lastName: z.string().min(1, "last name is required").max(20, "Last name must be less than 20 characters"),
    email: z.email("Email is Invalid").min(1, "Email is required"),
    password: z.string().min(8, "Password must be of minimmum 8 characters").max(20, "Password must be less than 20 characters"),
    mobileNumber: z.string().min(10, "Invalid Phone Number").max(13),
    role: z.enum(['USER', 'ADMIN'], { required_error: 'Role is required', invalid_type_error: 'Role must be USER or ADMIN' })
});

export default zodUserSchema;

export const updateUserSchemaForUsers = zodUserSchema.omit({
    email: true,
    password: true,
    mobileNumber: true,
    role: true
}).partial().strict();

export const updateUserSchemaForAdmin = zodUserSchema.omit({

    password: true,

}).partial().strict();

