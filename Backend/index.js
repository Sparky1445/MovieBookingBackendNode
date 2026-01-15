import express from "express";
import bodyParser from "body-parser";
import MovieRoute from "./routes/MovieRoute.js";
import TheatreRoute from "./routes/TheatreRoute.js";
import { PORT } from "./config/serverConfig.js";
import ConnectDB from "./config/db_config.js";
import errorHandler from "./errors/errorHandler.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);


app.get("/home/:id", (req, res) => {
    console.log('Hitting /home');
    console.log(req.query, req.params)
    res.json({
        message: "Welcome to the movie booking app",
        success: "True"
    })
})


//paths

app.use('/mba/api/v1/movies', MovieRoute);
app.use('/mba/api/v1/theatres', TheatreRoute);

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    ConnectDB();
});

