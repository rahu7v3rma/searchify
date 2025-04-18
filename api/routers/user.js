const UserModel = require("../models/user");
const express = require("express");
const { validateRequestBody } = require("../middlewares/request");
const z = require("zod");
const { isStrongPassword } = require("validator");
const { hashPassword } = require("../utils/bcrypt");
const { sendEmail } = require("../utils/email");

const UserRouter = express.Router();

const UserRegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().refine(isStrongPassword),
});

UserRouter.post(
  "/register",
  validateRequestBody(UserRegisterSchema),
  async (req, res) => {
    const { name, email, password } = req.body;

    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      return res.json({
        success: false,
        message: "User already exists",
        data: null,
      });
    }

    const hashedPassword = await hashPassword(password);
    const emailVerificationCode = Math.floor(Math.random() * 900000);
    await UserModel.create({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
      emailVerificationCode,
      role: "user",
    });

    await sendEmail(
      email,
      "softools email verification code",
      emailVerificationCode.toString()
    );

    res.json({
      success: true,
      message: "User registered successfully",
      data: null,
    });
  }
);

module.exports = UserRouter;
