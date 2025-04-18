const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const GktRouter = require("./routers/gkt");
const UserRouter = require("./routers/user");
const { notFoundHandler, appErrorHandler } = require("./middlewares/error");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(morgan("dev"));

app.use("/gkt", GktRouter);
app.use("/user", UserRouter);
app.use(notFoundHandler);
app.use(appErrorHandler);

app.get("/connect", async (req, res) => {
  res.send({
    success: true,
    message: "API connected",
    data: null,
  });
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
});

app.listen(process.env.PORT, () => {
  console.log(`Express server is running on port ${process.env.PORT}`);
});
