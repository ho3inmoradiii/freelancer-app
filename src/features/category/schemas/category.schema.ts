import { z } from 'zod';
import { CategoryTypeEnum } from "@/lib/schemas/category.schema";
import { CategoriesSchema } from "@/lib/schemas/category.schema";
import { createApiResponseSchema } from "@/lib/schemas/api.schemas";

export const CategorySchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(100),
    englishTitle: z.string().min(3).max(200),
    type: CategoryTypeEnum,
})

export type Category = z.infer<typeof CategorySchema>;

export type Categories = z.infer<typeof CategoriesSchema>;

export const GetCategoriesSchema = createApiResponseSchema(
    z.object({
        categories: z.array(CategoriesSchema),
    })
)

export type GetCategories = z.infer<typeof GetCategoriesSchema>;

export const GetCategorySchema = createApiResponseSchema(
    z.object({
        category: CategoriesSchema,
    })
)

export type GetCategory = z.infer<typeof GetCategorySchema>;
