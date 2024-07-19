import { z } from "zod";

/*
{
    name: string;
    email: string;
    monthly_budget: number;
    password: string;
    external_id: string | null;
}
*/

export const CreateAccountInput = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email" }),
  monthly_budget: z.number().transform((val) => val * 100),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  external_id: z.string().nullable(),
});

export const UpdateAccountInput = z.object({
  monthly_budget: z.number().transform((val) => val * 100),
});

export const LoginInput = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const CreateExpenseInput = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  amount: z.number().transform((val) => val * 100),
  date: z.string().transform((val) => new Date(val)),
  category: z.string(),
});

export const GetReportInput = z.object({
  startDate: z.string().transform((val) => new Date(val)),
  endDate: z.string().transform((val) => new Date(val)),
});
