import express from "express";
import { getUserByEmail as getUserByEmailController } from "../controllers/userController.js";
import { getUserById as getUserByIdController } from "../controllers/userController.js";
import { updateUser as updateUserController } from "../controllers/userController.js";
import { updateUserSchemaForUsers } from "../validators/zodUserSchema.js";
import { updateUserSchemaForAdmin } from "../validators/zodUserSchema.js";
import { zodUserValidator } from "../validators/zodUserValidator.js";
import { isLoggedIn } from "../validators/authValidator.js";
import { isAdmin } from "../validators/authValidator.js";

const Router = express.Router();

Router.get("/email/:email", getUserByEmailController);
Router.get("/id/:userId", getUserByIdController);
Router.patch("/:userId", isLoggedIn, zodUserValidator(updateUserSchemaForUsers), updateUserController);
Router.patch("/auth/admin/:userId", isLoggedIn, isAdmin, zodUserValidator(updateUserSchemaForAdmin), updateUserController);

export default Router;  