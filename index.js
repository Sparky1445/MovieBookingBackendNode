import express from "express";
import bodyParser from "body-parser";
import MovieRoute from "./routes/MovieRoute.js";
import { MONGO_URL, PORT } from "./config/serverConfig.js";
import ConnectDB from "./config/db_config.js";


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


//paths

app.use('/mba/api/v1/movies', MovieRoute);

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    ConnectDB();
});

