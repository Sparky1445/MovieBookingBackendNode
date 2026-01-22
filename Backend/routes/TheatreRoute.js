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
import { isLoggedIn } from "../validators/authValidator.js";

const Router = express.Router();

Router.post("/", isLoggedIn, createTheatreController);
Router.get("/:id", isLoggedIn, getTheatreController);
Router.get("/", isLoggedIn, getAllTheatresController);
Router.delete("/:id", deleteTheatreController);
Router.patch("/:id", validateTheatre(updateTheatreSchema), updateTheatreController);
Router.patch("/:id/movies", updateMoviesInTheatreController);
Router.get("/movie/:id", getTheatresByMovieIdController);
Router.get("/:id/movies", getMoviesInTheatreController);


export default Router;

//Add validator for TheatreCreate 