import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URL, PORT } from "./config/serverConfig.js";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/home", (req, res) => {
    console.log('Hitting /home');
    res.json({
        message: "Welcome to the movie booking app",
        success: "True"
    })
})



app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected");

    } catch (err) {
        console.log("Error connecting to the DB", err);
    }
});

