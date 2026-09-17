import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Spicer backend is running");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });