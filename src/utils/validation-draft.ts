import { z } from 'zod';

// Common validation messages
const requiredField = "This field is required";

// Register form schema
export const registerSchema = z.object({
  fullName: z.string().min(1, requiredField).max(100),
  gender: z.string().min(1, requiredField),
  email: z.string().min(1, requiredField).email("Invalid email address"),
  mobile: z.string()
    .min(1, requiredField)
    .regex(/^[0-9]{11}$/, "Must be a valid 11-digit phone number"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(1, requiredField),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Login form schema
export const loginSchema = z.object({
  email: z.string().min(1, requiredField).email("Invalid email address"),
  password: z.string().min(1, requiredField),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;