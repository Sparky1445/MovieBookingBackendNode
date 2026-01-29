import express from "express";
import { createTheatre as createTheatreController, getTheatreById as getTheatreController } from "../controllers/ThreatreController.js";
import { validateTheatre } from "../validators/zodTheatreValidator.js";
import { getAllTheatres as getAllTheatresController } from "../controllers/ThreatreController.js";
import { deleteTheatre as deleteTheatreController } from "../controllers/ThreatreController.js";
import { updateTheatre as updateTheatreController } from "../controllers/ThreatreController.js";
import { updateTheatreSchema } from "../validators/zodTheatreSchema.js";
import { updateMoviesInTheatre as updateMoviesInTheatreController } from "../controllers/ThreatreController.js";
import { getTheatresByMovieId as getTheatresByMovieIdController } from "../controllers/ThreatreController.js";
import { getMoviesInTheatre as getMoviesInTheatreController } from "../controllers/ThreatreController.js";
import { isAdmin, isLoggedIn } from "../validators/authValidator.js";
import theatreSchema from "../validators/zodTheatreSchema.js";
import { isAdminOrClient } from "../validators/authValidator.js";
const Router = express.Router();

Router.post("/", isLoggedIn, isAdminOrClient, validateTheatre(theatreSchema), createTheatreController);
Router.get("/:id", isLoggedIn, getTheatreController);
Router.get("/", isLoggedIn, getAllTheatresController);
Router.delete("/:id", isLoggedIn, isAdmin, deleteTheatreController);
Router.patch("/:id", isLoggedIn, isAdminOrClient, validateTheatre(updateTheatreSchema), updateTheatreController);
Router.patch("/:id/movies", isLoggedIn, isAdminOrClient, updateMoviesInTheatreController);
Router.get("/movie/:id", isLoggedIn, getTheatresByMovieIdController);
Router.get("/:id/movies", isLoggedIn, getMoviesInTheatreController);


export default Router;

//Add validator for TheatreCreate 