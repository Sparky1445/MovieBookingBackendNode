import express from "express";
import { createTheatre as createTheatreController, getTheatreById as getTheatreController } from "../controllers/ThreatreController.js";
import { validateTheatre } from "../validators/zodTheatreValidator.js";
import theatreSchema from "../validators/zodTheatreSchema.js";

const Router = express.Router();

Router.post("/", validateTheatre(theatreSchema), createTheatreController);
Router.get("/:id", getTheatreController);


export default Router;