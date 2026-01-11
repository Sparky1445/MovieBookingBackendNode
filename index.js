import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
dotenv.config();



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



app.listen(process.env.PORT, async () => {
    console.log(`Server started on port ${process.env.PORT}`);
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    } catch (err) {
        console.log("Error connecting to the DB", err);
    }
});

