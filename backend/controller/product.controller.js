import mongoose  from "mongoose";
import Product from "../models/product.model.js";

export const getproducts = async (req, res) => {
    try {
        const products  = await product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log(("error in fetching products:", error.message));
        res.status(500).json({success: false, message: "server error"});
    }
}

export const createProduct = async (req, res) =>  {
  ///const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const  updatedProduct = async (req, res) =>  {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
    res.status(200).json({success: true, data: updatedProduct });
    } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });

  } 
  };



export const deleteproduct =  async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};