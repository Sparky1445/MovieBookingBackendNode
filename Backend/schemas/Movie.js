import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    trailerURL: {
        type: String,
        required: true

    },
    language: {
        type: String,
        required: true,
        default: "English",
    },
    director: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    releaseStatus: {
        type: String,
        required: true,
        default: "Upcoming",
        enum: ["Upcoming", "Released", "Rejected"]
    }



},
    {
        timestamps: true
    })

const Movie = mongoose.model("Movie", movieSchema);

export default Movie
