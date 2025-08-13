import express from "express";
import { createproduct, deleteproduct, getproducts, updatedProduct } from "../backend/controller/product.controller.js";


const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Fetch all products from the database
 * @access  Public
 */
router.get("/", getproducts);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Public
 */
router.post("/", createproduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update an existing product by ID
 * @access  Public
 */
router.put("/:id", updatedProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product by ID
 * @access  Public
 */
router.delete("/:id", deleteproduct);  

export default router;