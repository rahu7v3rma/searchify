import { NextFunction, Request, Response } from "express";

export const appErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.json({
    success: false,
    message: "Internal server error",
    data: null,
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.json({
    success: false,
    message: "Route not found",
    data: null,
  });
};
