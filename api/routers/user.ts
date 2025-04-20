import dotenv from "dotenv";
import express from "express";
import { verifyAuthToken } from "../middlewares/auth";
import { validateRequestBody } from "../middlewares/request";
import UserModel from "../models/user";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { sendEmail } from "../utils/email";
import { createToken } from "../utils/jwt";
import {
  UserEmailVerificationCodeSchema,
  UserForgotPasswordSchema,
  UserLoginSchema,
  UserProfileSchema,
  UserRegisterSchema,
  UserResetPasswordSchema
} from "../validators/user";

dotenv.config();

const UserRouter = express.Router();

UserRouter.post(
  "/register",
  validateRequestBody(UserRegisterSchema),
  async (req, res) => {
    const { name, email, password } = req.body;

    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      res.json({
        success: false,
        message: "User already exists",
        data: null,
      });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const emailVerificationCode = Math.floor(
      Math.random() * 1000000
    ).toString();
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
      `${process.env.WEBSITE_NAME} email verification`,
      emailVerificationCode.toString()
    );

    res.json({
      success: true,
      message: "User registered successfully",
      data: null,
    });
  }
);

UserRouter.post(
  "/login",
  validateRequestBody(UserLoginSchema),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user || !comparePassword(password, user.password)) {
      res.json({
        success: false,
        message: "User not found",
        data: null,
      });
      return;
    }

    if (!user.isEmailVerified) {
      res.json({
        success: false,
        message: "Email not verified",
        data: null,
      });
      return;
    }

    const token = createToken(user.id);

    res.json({
      success: true,
      message: "User logged in successfully",
      data: { token },
    });
  }
);

UserRouter.post("/verify-email", async (req, res) => {
  const { email, emailVerificationCode } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user || user.emailVerificationCode !== emailVerificationCode) {
    res.json({ success: false, message: "User not found", data: null });
    return;
  }

  await UserModel.updateOne({ email }, { isEmailVerified: true });

  res.json({
    success: true,
    message: "Email verified successfully",
    data: null,
  });
});

UserRouter.get("/profile", verifyAuthToken, (req, res) => {
  const user = req.user;
  const responseData = {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  };
  res.json({
    success: true,
    message: "User profile retrieved successfully",
    data: responseData,
  });
  return;
});

UserRouter.post(
  "/profile",
  verifyAuthToken,
  validateRequestBody(UserProfileSchema),
  async (req, res) => {
    const { name, email, password } = req.body;

    if (name) req.user.name = name;
    if (email) req.user.email = email;
    if (password) req.user.password = await hashPassword(password);

    await req.user.save();

    res.json({
      success: true,
      message: "User profile updated successfully",
      data: null,
    });
  }
);

UserRouter.post(
  "/forgot-password",
  validateRequestBody(UserForgotPasswordSchema),
  async (req, res) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.json({
        success: false,
        message: "User not found",
        data: null,
      });
      return;
    }

    const emailVerificationCode = Math.floor(
      Math.random() * 1000000
    ).toString();

    await UserModel.updateOne({ email }, { emailVerificationCode });

    await sendEmail(
      email,
      `${process.env.WEBSITE_NAME} password reset`,
      emailVerificationCode
    );

    res.json({
      success: true,
      message: "Password reset email sent",
      data: null,
    });
  }
);

UserRouter.post(
  "/reset-password",
  validateRequestBody(UserResetPasswordSchema),
  async (req, res) => {
    const { email, emailVerificationCode, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user || user.emailVerificationCode !== emailVerificationCode) {
      res.json({
        success: false,
        message: "User not found",
        data: null,
      });
      return;
    }

    await UserModel.updateOne(
      { email },
      { password: await hashPassword(password) }
    );

    res.json({
      success: true,
      message: "Password reset successfully",
      data: null,
    });
  }
);

UserRouter.post(
  "/email-verification-code",
  validateRequestBody(UserEmailVerificationCodeSchema),
  async (req, res) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.json({
        success: false,
        message: "User not found",
        data: null,
      });
      return;
    }

    const emailVerificationCode = Math.floor(
      Math.random() * 1000000
    ).toString();

    await UserModel.updateOne({ email }, { emailVerificationCode });

    await sendEmail(
      email,
      `${process.env.WEBSITE_NAME} email verification`,
      emailVerificationCode
    );

    res.json({
      success: true,
      message: "Email verification code sent",
      data: null,
    });
  }
);

export default UserRouter;
