const UserModel = require("../models/user");
const express = require("express");
const { validateRequestBody } = require("../middlewares/request");
const { UserRegisterSchema } = require("../utils/zod");

const UserRouter = express.Router();

UserRouter.post(
  "/register",
  validateRequestBody(UserRegisterSchema),
  async (req, res) => {
    const { email, password } = req.body;
    await UserModel.create({ email, password });
    res.json({
      success: true,
      message: "User registered successfully",
      data: null,
    });
  }
);

module.exports = UserRouter;
