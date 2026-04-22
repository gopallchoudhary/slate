import { z } from "zod";

export const signUpSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().optional().nullable(),
    email: z.email(),
    password: z.string().min(8),
})

export const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
})

export const createRoomSchema = z.object({
    name: z.string().min(2),
    description: z.string().optional().nullable(),
})