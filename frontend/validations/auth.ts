import { z } from "zod";

export const SignInFormSchema = z.object({
  identifier: z.email("Please enter a valid email address"),
  password: z.string().max(100, "Password must be less than 100 characters"),
});

export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be less than 20 characters"),
  username: z.string(),
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters"),
});

export type SignInFormSchema = z.infer<typeof SignInFormSchema>;
export type SignUpFormSchema = z.infer<typeof SignUpFormSchema>;

export type FormState = {
  success?: boolean;
  message?: string;
  data?: {
    identifier?: string;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
  };
  strapiErrors?: {
    status: number;
    name: string;
    username: string;
    message: string;
    details?: Record<string, string[]>;
  } | null;
  zodErrors?: {
    identifier?: string[];
    name?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
  } | null;
};
