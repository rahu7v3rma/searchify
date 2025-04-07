import express from "express";
import UserRouter from "./routers/user";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(morgan("dev"));

app.use("/user", UserRouter);

app.get("/connect", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.send({
    success: true,
    message: "API connected",
    data: null,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  console.log("Connected to MongoDB");
});

export default app;
