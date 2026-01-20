import express from "express";
import { createTheatre as createTheatreController, getTheatreById as getTheatreController } from "../controllers/ThreatreController.js";
import { validateTheatre } from "../validators/zodTheatreValidator.js";
import theatreSchema from "../validators/zodTheatreSchema.js";
import { getAllTheatres as getAllTheatresController } from "../controllers/ThreatreController.js";
import { deleteTheatre as deleteTheatreController } from "../controllers/ThreatreController.js";
import { updateTheatre as updateTheatreController } from "../controllers/ThreatreController.js";
import { updateTheatreSchema } from "../validators/zodTheatreSchema.js";

const Router = express.Router();

Router.post("/", validateTheatre(theatreSchema), createTheatreController);
Router.get("/:id", getTheatreController);
Router.get("/", getAllTheatresController);
Router.delete("/:id", deleteTheatreController);
Router.put("/:id", validateTheatre(updateTheatreSchema), updateTheatreController);
export default Router;