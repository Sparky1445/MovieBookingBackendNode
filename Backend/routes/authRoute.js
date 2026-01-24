import express from "express";
import { login as loginController } from "../controllers/authController.js"
import { signup as signupController } from "../controllers/authController.js"
import { zodUserValidator } from "../validators/zodUserValidator.js";
import zodUserSchema from "../validators/zodUserSchema.js";
import { resetPassword as resetPasswordController } from "../controllers/authController.js";
import { isLoggedIn } from "../validators/authValidator.js";

const Router = express.Router();
Router.post("/signup", zodUserValidator(zodUserSchema), signupController);
Router.post("/login", loginController);
Router.patch("/reset", isLoggedIn, resetPasswordController);

export default Router;