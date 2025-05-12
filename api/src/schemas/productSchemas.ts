import { z } from "zod";

export const createProductSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    image: z.string().optional(),
    price: z.number().min(1),
});

export const updateProductSchema = z
    .object({
        title: z.string().min(1),
        description: z.string().min(1),
        image: z.string(),
        price: z.number().min(1),
    })
    .partial();
