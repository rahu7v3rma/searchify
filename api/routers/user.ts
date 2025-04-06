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
    res.status(400).json({
      success: false,
      message: parsedBody.error.flatten().fieldErrors,
      data: null,
    });
    return;
  }
  const { name, email, password } = parsedBody.data;
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
    res.status(400).json({
      success: false,
      message: parsedBody.error.flatten().fieldErrors,
      data: null,
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
