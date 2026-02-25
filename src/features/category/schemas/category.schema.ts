import { z } from 'zod';

export const CategoryTypeEnum = z.enum(["project", "post", "comment", "ticket"]);

export type CategoryType = z.infer<typeof CategoryTypeEnum>;

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

export const CategoriesSchema = z.object({
    _id: z.string(),
    title: z.string(),
    englishTitle: z.string(),
    description: z.string(),
    type: CategoryTypeEnum,
});

export type Categories = z.infer<typeof CategoriesSchema>;

export const GetCategoriesSchema = z.object({
    statusCode: z.number(),
    data: z.object({
        categories: z.array(CategoriesSchema),
    }),
})

export type GetCategories = z.infer<typeof GetCategoriesSchema>;
