import express from "express";
import { createMovie as createMovieController } from "../controllers/MovieController.js";
import zodValidator from "../validators/zodMovieValidator.js";
import movieSchema from "../validators/zodMovieSchema.js";

const router = express.Router();

router.post('/', zodValidator(movieSchema), createMovieController);

export default router;