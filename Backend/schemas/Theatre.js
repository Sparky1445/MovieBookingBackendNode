import mongoose from "mongoose";

const TheatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },

    description: {
        type: String
    },

    city: {
        type: String,
        required: true,

    },
    pincode: {
        type: Number,
        required: true,

    },
    address: {
        type: String

    },


}, {
    timestamps: true
})

const Theatre = mongoose.model("Theatre", TheatreSchema);

export default Theatre;