import { z } from 'zod';
export const CategorySchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(100),
    englishTitle: z.string().min(3).max(200),
    type: z.enum(["project", "post", "comment", "ticket"]),
})

export type Category = z.infer<typeof CategorySchema>;

export const CategoryResponseSchema = z.object({
    statusCode: z.number(),
    data: z.object({
        message: z.string(),
    }),
})

export type CategoryResponse = z.infer<typeof CategoryResponseSchema>;
