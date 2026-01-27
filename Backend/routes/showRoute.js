import express from "express";
import { createShow as createShowController } from "../controllers/showController.js";
import { zodShowValidator } from "../validators/zodShowValidator.js";
import zodShowSchema from "../validators/zodShowSchema.js";
import { isAdminOrClient, isClient, isLoggedIn } from "../validators/authValidator.js";

const Router = express.Router();

Router.post("/", isLoggedIn, isAdminOrClient, zodShowValidator(zodShowSchema), createShowController);

export default Router;
