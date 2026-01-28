import express from "express";
import { createShow as createShowController } from "../controllers/showController.js";
import { zodShowValidator } from "../validators/zodShowValidator.js";
import zodShowSchema from "../validators/zodShowSchema.js";
import { isAdminOrClient, isLoggedIn } from "../validators/authValidator.js";
import { getShowById as getShowByIdController } from "../controllers/showController.js";
import { deleteShow as deleteShowController } from "../controllers/showController.js";

const Router = express.Router();

Router.post("/", isLoggedIn, isAdminOrClient, zodShowValidator(zodShowSchema), createShowController);
Router.get("/:theatreId/:movieId", isLoggedIn, getShowByIdController);
Router.delete("/:showId", isLoggedIn, isAdminOrClient, deleteShowController);

export default Router;
