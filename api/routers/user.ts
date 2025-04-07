import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import UserModel from "../models/user";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { LoginSchema, SignUpSchema } from "../utils/schema";
import { UserRequest } from "../utils/types";

const UserRouter = Router();

UserRouter.post("/signup", async (req, res) => {
  const requestBody = req.body;
  const parsedBody = SignUpSchema.safeParse(requestBody);
  if (!parsedBody.success) {
    const fieldErrors = parsedBody.error.flatten().fieldErrors;
    const firstErrorMessage = Object.values(fieldErrors)[0][0];
    res.status(400).json({
      success: false,
      message: firstErrorMessage,
      data: fieldErrors,
    });
    return;
  }
  const { name, email, password } = parsedBody.data;
  const findUser = await UserModel.findOne({ email });
  if (findUser) {
    res.status(400).json({
      success: false,
      message: "User already exists",
      data: null,
    });
    return;
  }
  const hashedPassword = await hashPassword(password);
  await UserModel.create({ name, email, password: hashedPassword });
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: null,
  });
});

UserRouter.post("/login", async (req, res) => {
  const requestBody = req.body;
  const parsedBody = LoginSchema.safeParse(requestBody);
  if (!parsedBody.success) {
    const fieldErrors = parsedBody.error.flatten().fieldErrors;
    const firstErrorMessage = Object.values(fieldErrors)[0][0];
    res.status(400).json({
      success: false,
      message: firstErrorMessage,
      data: fieldErrors,
    });
    return;
  }
  const { email, password } = parsedBody.data;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
      data: null,
    });
    return;
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
      data: null,
    });
    return;
  }
  const token = generateToken(user._id.toString());
  res
    .status(200)
    .json({ success: true, message: "Login successful", data: { token } });
});

UserRouter.get("/profile", authMiddleware, async (req: UserRequest, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: user,
  });
});

export default UserRouter;
