import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig.js";

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected!!!");
    }
    catch (err) {
        console.log("Error connecting to the DB", err);
        process.exit(1);
    }
}

export default ConnectDB;