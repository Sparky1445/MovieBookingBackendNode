import express from "express";
import bodyParser from "body-parser";
import MovieRoute from "./routes/MovieRoute.js";
import TheatreRoute from "./routes/TheatreRoute.js";
import { PORT } from "./config/serverConfig.js";
import ConnectDB from "./config/db_config.js";
import errorHandler from "./errors/errorHandler.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
app.use('/mba/api/v1/auth/login', authRoute);
app.use('/mba/api/v1/user', userRoute);

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Movie Booking Backend",
        success: true
    })
})

app.use((req, res) => {
    res.status(404).json({
        message: "Not Found",
        success: "False"
    })
})

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    ConnectDB();
});

