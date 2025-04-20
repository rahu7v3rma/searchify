import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/jwt";
import UserModel from "../models/user";

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  if (!token) {
    res.json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
    return;
  }

  token = token.replace("Bearer ", "");
  if (!token) {
    res.json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
    return;
  }

  const decodedToken = decodeToken(token) as { userId: string };
  if (!decodedToken) {
    res.json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
    return;
  }

  if (!Object.keys(decodedToken).length) {
    res.json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
    return;
  }

  if (!decodedToken?.userId) {
    res.json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
    return;
  }

  const user = await UserModel.findById(decodedToken.userId);
  if (!user) {
    res.json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
    return;
  }

  if (!user.isEmailVerified) {
    res.json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
    return;
  }

  req.user = user;

  next();
};
