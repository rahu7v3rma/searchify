import express from "express";
import multer from "multer";
import z from "zod";
import { validateRequestBody } from "../middlewares/request";

const AdminRouter = express.Router();

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(1),
});

AdminRouter.get(
  "/contact-us",
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 10 },
  }).single("attachment"),
  validateRequestBody(schema),
  (req, res) => {
    res.json({
      message: "Hello World",
    });
  }
);

export default AdminRouter;
