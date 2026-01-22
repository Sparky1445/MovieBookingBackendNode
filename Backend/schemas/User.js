import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
        trim: true,
        lowercase: true,
        minlength: [3, 'First name must be at least 3 characters long'],
        maxlength: [30, 'First name must be at most 30 characters long']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
        trim: true,
        lowercase: true,
        minlength: [3, 'Last name must be at least 3 characters long'],
        maxlength: [30, 'Last name must be at most 30 characters long'],
    },
    mobileNumber: {
        type: String,
        trim: true,
        maxlength: [10, 'Mobile number must be at most 10 characters long'],
        minlength: [10, 'Mobile number must be at least 10 characters long'],
        unique: [true, "Mobile number already exists~Schema"],
        required: [true, 'Please enter your mobile number']
    },
    email: {
        type: String,
        trim: true,
        unique: [true, "Email already exists~Schema"],
        required: [true, 'Please enter your email'],
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Password must be at least 8 characters'],
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, {
    timestamps: true
})


userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);

})

const User = mongoose.model("User", userSchema);


export default User; 
