import { isStrongPassword } from "validator";
import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().refine(isStrongPassword, {
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
