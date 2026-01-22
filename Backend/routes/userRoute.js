import express from "express";
import { createUser as createUserController } from "../controllers/userController.js";
import { zodUserValidator } from "../validators/zodUserValidator.js";
import zodUserSchema from "../validators/zodUserSchema.js";

const Router = express.Router();

Router.post("/", zodUserValidator(zodUserSchema), createUserController);

export default Router;