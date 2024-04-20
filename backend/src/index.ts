import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import express, { Request, Response } from "express";

// init app
const app = express();

// settings
app.set("port", 3000 || process.env.PORT);

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//test route
app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});

// server listening
app.listen(app.get("port"), () => {
  console.log("server running on port", app.get("port"));
});
