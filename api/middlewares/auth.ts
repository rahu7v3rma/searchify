import { NextFunction, Response } from "express";
import UserModel from "../models/user";
import { verifyToken } from "../utils/jwt";
import { UserRequest } from "../utils/types";
export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
    return;
  }
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
    return;
  }
  console.log({ decodedToken });
  const user = await UserModel.findById(decodedToken);
  if (!user) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
    return;
  }
  req.user = user;
  next();
};
