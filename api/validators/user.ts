import z from "zod";
import { isStrongPassword } from "validator";

export const UserRegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().refine(isStrongPassword, {
    message:
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  }),
});

export const UserLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const UserEmailVerificationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  emailVerificationCode: z.string().min(1, {
    message: "Email verification code is required",
  }),
});

export const UserProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z
    .string()
    .refine(isStrongPassword, {
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    })
    .optional(),
});

export const UserForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const UserResetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  emailVerificationCode: z.string().min(1, {
    message: "Email verification code is required",
  }),
  password: z.string().refine(isStrongPassword, {
    message:
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  }),
});

export const UserEmailVerificationCodeSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
