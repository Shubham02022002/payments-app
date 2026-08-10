import { z } from "zod";
export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(2, "Username must be at least 2 characters long")
      .trim(),
    email: z
      .string()
      .email("Invalid email address")
      .trim()
      .transform((val) => val.toLowerCase()),
    age: z
      .number()
      .min(18, "You must be at least 18 years old to use financial services"),
    phone: z
      .string()
      .regex(
        /^(\+91[\-\s]?)?[6-9]\d{9}$/,
        "Invalid phone number. Use a valid 10-digit Indian mobile number (e.g., +919876543210 or 9876543210)",
      )
      .trim()
      .transform((val) => {
        const digits = val.replace(/\D/g, "");
        const last10 = digits.slice(-10);
        return `+91${last10}`;
      }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .trim()
      .transform((val) => val.toLowerCase()),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
  })
  .strict();

export const transferSchema = z.object({
  amount: z.number().positive("Transfer amount must be greater than zero"),
  receiverPhone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid receiver phone number format")
    .trim(),
});
