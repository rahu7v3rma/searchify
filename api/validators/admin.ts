import { z } from "zod";

export const AdminContactUsSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});
