import express from "express";
import { createMovie as createMovieController } from "../controllers/MovieController.js";
import zodValidator from "../validators/zodMovieValidator.js";
import movieSchema from "../validators/zodMovieSchema.js";
import { getMovieById as getMovieByIdController } from "../controllers/MovieController.js";
import { getAllMovies as getAllMoviesController } from "../controllers/MovieController.js";
import { deleteMovie as deleteMovieController } from "../controllers/MovieController.js";
import { updateMovieSchema } from "../validators/zodMovieSchema.js";
import { updateMovie as updateMovieController } from "../controllers/MovieController.js";
import { getMovieByName as getMovieByNameController } from "../controllers/MovieController.js";
import { isLoggedIn } from "../validators/authValidator.js";
import { isAdmin } from "../validators/authValidator.js";

const router = express.Router();



router.post('/', isLoggedIn, isAdmin, zodValidator(movieSchema), createMovieController);
router.get('/:id', getMovieByIdController);
router.get('/', getAllMoviesController);
router.delete('/:id', isLoggedIn, isAdmin, deleteMovieController);
router.put("/:id", isLoggedIn, isAdmin, zodValidator(updateMovieSchema), updateMovieController);
router.get("/name/:name", getMovieByNameController);


export default router;