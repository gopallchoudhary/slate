import { z } from "zod";

export const SignUpSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().optional().nullable(),
    email: z.email(),
    password: z.string().min(8),
})

export const SignInSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
})