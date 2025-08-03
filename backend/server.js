import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.post("/products", async (req, res) => {
    const product = req.body; // User will send this data

    if(!product.name || product.price || product.image) {
        return res.status(400).json({success:false, message: "please provide all fields"});
    }

    const newproduct = new product(product)

    try {
        await newproduct.save();
        res.status(201).json({ success: true, data: newproduct});
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({success: false, message: "server Error"});
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started att http://localhost:5000" );
});


