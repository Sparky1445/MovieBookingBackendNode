import { z } from "zod";

const movieSchema = z.object({
    name: z.string().min(1, "Name must be at least 1 characters long"),
    description: z.string().min(100, "Description must be at least 100 characters long"),
    cast: z.array(z.string().min(1, "Cast member must be at least 1 characters long")),
    trailerURL: z.string().url("Trailer URL must be a valid URL"),
    language: z.string().min(3, "Language must be at least 3 characters long"),
    director: z.string().min(3, "Director must be at least 3 characters long"),
    releaseDate: z.string().min(10, "Release date must be at least 10 characters long"),
    releaseStatus: z.enum(["Upcoming", "Released", "Rejected"]),
})

export default movieSchema;

export const updateMovieSchema = movieSchema.partial().strict();