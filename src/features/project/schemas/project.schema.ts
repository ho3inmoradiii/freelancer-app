import { z } from "zod";
import { CategoriesSchema } from "@/lib/schemas/category.schema";
import { MiniUserSchema } from "@/lib/schemas/user.schema";
import { ProposalEntitySchema } from "@/lib/schemas/proposal.schema";
import { createApiResponseSchema } from "@/lib/schemas/api.schemas";
import { moneyFieldSchema } from "@/lib/schemas/common.schema";

export const ProjectFormSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(10),
    tags: z.array(z.string()).min(1),
    category: z.string().min(1, 'انتخاب دسته‌بندی اجباری است'),
    budget: moneyFieldSchema,
    deadline: z.date()
        .nullable()
        .refine((date) => date !== null, "لطفاً ددلاین پروژه را انتخاب کنید")
});

export type ProjectForm = z.infer<typeof ProjectFormSchema>;

const projectCategorySchema = CategoriesSchema.pick({
    _id: true,
    title: true,
    englishTitle: true,
});

export const projectSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.enum(["OPEN", "CLOSED"]),
    budget: z.number(),
    tags: z.array(z.string()),
    proposals: z.array(z.union([z.string(), ProposalEntitySchema])),
    deadline: z.string().datetime(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),

    category: projectCategorySchema,
    owner: MiniUserSchema,
    freelancer: MiniUserSchema.nullable(),
});

export type Project = z.infer<typeof projectSchema>;

export const rawProjectSchema = projectSchema.extend({
    category: z.string(),
    owner: z.string(),
    freelancer: z.string().nullable(),
});

export const CreateProjectResponseSchema = createApiResponseSchema(
    z.object({
        project: rawProjectSchema
    })
);

export type CreateProjectResponse = z.infer<typeof CreateProjectResponseSchema>;

export const projectListResponseSchema = createApiResponseSchema(
    z.object({
        projects: z.array(projectSchema),
    })
);

export type ProjectListResponse = z.infer<typeof projectListResponseSchema>;

export const freelancerProjectSchema = projectSchema.omit({
    proposals: true,
    owner: true,
    freelancer: true,
});

export type FreelancerProject = z.infer<typeof freelancerProjectSchema>;

export const freelancerProjectListResponseSchema = createApiResponseSchema(
    z.object({
        projects: z.array(freelancerProjectSchema),
    })
);

export type FreelancerProjectListResponse = z.infer<typeof freelancerProjectListResponseSchema>;

export const GetProjectResponseSchema = createApiResponseSchema(
    z.object({
        project: projectSchema
    })
);

export type GetProjectResponse = z.infer<typeof GetProjectResponseSchema>;

