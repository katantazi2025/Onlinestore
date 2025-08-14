i// backend/server.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"; // make sure this path exists

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Parse JSON bodies
app.use(express.json());

// Mount routes (NEEDS the leading slash)
app.use("/api/products", productRoutes);

// Simple health check
app.get("/", (_req, res) => {
  res.json({ ok: true, service: "online-store-api" });
});

// Start server AFTER DB connect
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
