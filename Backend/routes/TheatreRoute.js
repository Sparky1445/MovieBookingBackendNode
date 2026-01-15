import express from "express";
import { createTheatre as createTheatreController } from "../controllers/ThreatreController.js";

const Router = express.Router();

Router.post("/", createTheatreController);


export default Router;