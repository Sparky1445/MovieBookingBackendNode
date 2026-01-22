import express from "express";
import { login as loginController } from "../controllers/authController.js"

const Router = express.Router();

Router.post("/", loginController)

export default Router;