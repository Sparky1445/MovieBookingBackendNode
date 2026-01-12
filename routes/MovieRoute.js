import express from "express";
import { createMovie as createMovieController } from "../controllers/MovieController.js";
import zodValidator from "../validators/zodMovieValidator.js";
import movieSchema from "../validators/zodMovieSchema.js";
import { getMovieById as getMovieByIdController } from "../controllers/MovieController.js";
import { getAllMovies as getAllMoviesController } from "../controllers/MovieController.js";
import { deleteMovie as deleteMovieController } from "../controllers/MovieController.js";
const router = express.Router();

router.post('/', zodValidator(movieSchema), createMovieController);
router.get('/:id', getMovieByIdController);
router.get('/', getAllMoviesController);
router.delete('/:id', deleteMovieController);

export default router;