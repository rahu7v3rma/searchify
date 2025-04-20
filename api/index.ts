import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { appErrorHandler, notFoundHandler } from "./middlewares/error";
import AdminRouter from "./routers/admin";
import GktRouter from "./routers/gkt";
import UserRouter from "./routers/user";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
console.log("Allowed cors origin:", process.env.CORS_ORIGIN);
app.use(morgan("dev"));

app.use("/gkt", GktRouter);
app.use("/user", UserRouter);
app.use("/admin", AdminRouter);
app.get("/connect", async (req, res) => {
  res.send({
    success: true,
    message: "API connected",
    data: null,
  });
});
app.use(notFoundHandler);
app.use(appErrorHandler);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Mongodb connected");
});

app.listen(process.env.PORT, () => {
  console.log(`Express server live at http://localhost:${process.env.PORT}`);
});
