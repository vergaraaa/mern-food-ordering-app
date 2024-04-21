import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import myUserRoutes from "./routes/my-user";

// db connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("db connected");
});

// init app
const app = express();

// settings
app.set("port", 3000 || process.env.PORT);

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/my-user", myUserRoutes);

// server listening
app.listen(app.get("port"), () => {
  console.log("server running on port", app.get("port"));
});
