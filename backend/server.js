import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import Product from "./models/product.model.js";




dotenv.config();

const app = express();

app.use(express.json()) // allows to accept json data in the req.body

app.get("/api/products", async (req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"})

    }
})

app.post("/api/products", async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ success: false, message: "please provide all fields" });
  }

  try {
    const newProduct = new Product({ name, price, image });  // ✅ This must use 'Product'
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({ success: false, message: "server Error" });
  }
});


app.put("/api/products/:id", async (req, res) => {
    const{ id } = req.params;

    const product =req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"invalid product ID"} );
    }

    try{
        const updatedProduct = await product.findByIdAndUpdate(id, product,{new:true});
        res.status(200).json({success:true, data: updatedProduct});

    } catch(error) {
        res.status.json({success: false, message: "server Error"});
    }
})

app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        await product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "product deleted"});
    }catch (error) {
        console.log("Error in deleting the product:", error.message);
        res.status(404).json({success: false, message: "product not found"});
    }
})

app.listen(5000, () => {
    connectDB();
    console.log("Server started att http://localhost:5000" );
});


