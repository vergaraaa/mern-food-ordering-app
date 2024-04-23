import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import myUserRoutes from "./routes/my-user";
import { v2 as cloudinary } from "cloudinary";
import express, { Request, Response } from "express";

// db connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("db connected");
});

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// init app
const app = express();

// settings
app.set("port", 3000 || process.env.PORT);

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// health endpoint
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

// routes
app.use("/api/my-user", myUserRoutes);

// server listening
app.listen(app.get("port"), () => {
  console.log("server running on port", app.get("port"));
});
