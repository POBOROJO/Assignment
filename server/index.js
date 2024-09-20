import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";
import cors from "cors";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/home", (req, res) => {
  res.json({ message: "Hello World" });
});

connectDB();

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
