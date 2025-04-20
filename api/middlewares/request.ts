import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateRequestBody = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.json({
        success: false,
        message: "Invalid request",
        data: null,
      });
      return;
    }
    next();
  };
};
