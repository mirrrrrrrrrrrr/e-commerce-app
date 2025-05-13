import { z } from "zod";

export const registerUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.string().default("user"),
    name: z.string(),
    address: z.string().min(5).max(500),
});

export const loginUserSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(6),
    })
    .pick({ email: true, password: true });
