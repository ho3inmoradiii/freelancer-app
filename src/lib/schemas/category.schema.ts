import {z} from "zod";

export const CategoryTypeEnum = z.enum(["project", "post", "comment", "ticket"]);

export const CategoriesSchema = z.object({
    _id: z.string(),
    title: z.string(),
    englishTitle: z.string(),
    description: z.string(),
    type: CategoryTypeEnum,
});
