import mongoose from 'mongoose';

const ShowSchema = new mongoose.Schema({
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre",
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    showDate: {
        type: Date,
        required: true
    },
    showTime: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    format: {
        type: String,

    }




}, {
    timestamps: true
})

const Show = mongoose.model("Show", ShowSchema)

export default Show