import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre',
        required: true


    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Show"
    },

    timing: {
        type: String,
        required: true

    },

    noOfSeats: {
        type: Number,
        required: true
    },

    seats: {
        type: Array,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["IN_PROGRESS", "CONFIRMED", "CANCELLED"],
            message: "Status can only be IN_PROGRESS, CONFIRMED or CANCELLED"
        },
        default: "IN_PROGRESS",
        required: true
    }


}, {
    timestamps: true
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;