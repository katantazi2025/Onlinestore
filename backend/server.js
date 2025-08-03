import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/products", (req, res) => {})
//console.log (process.env.MONGO_URL)

app.listen(5000, () => {
    connectDB();
    console.log("Server started att http://localhost:5000" );
});


