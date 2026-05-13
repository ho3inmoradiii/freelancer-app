import { z } from 'zod';
import { RoleEnum } from "@/lib/schemas/user.schema";
import { UserSchema } from "@/lib/schemas/user.schema";
import { createApiResponseSchema } from "@/lib/schemas/api.schemas";

export type Role = z.infer<typeof RoleEnum>;

export type User = z.infer<typeof UserSchema>;

export const GetProfileResponseSchema = z.object({
    statusCode: z.number(),
    data: z.object({
        user: UserSchema,
    }),
});

export type GetProfileResponse = z.infer<typeof GetProfileResponseSchema>;

export const CompleteProfileSchema = z.object({
    name: z.string()
        .min(3),
    email: z.string()
        .trim()
        .toLowerCase()
        .email("ایمیل درستی رو وارد کنید"),
    role: z.enum(["OWNER", "FREELANCER"])
        .refine(val => val === "OWNER" || val === "FREELANCER", {
            message: "انتخاب یکی از نقش ها اجباری است!",
        }),
})

export type CompleteProfile = z.infer<typeof CompleteProfileSchema>;

export const CompleteProfileResponseSchema = z.object({
    statusCode: z.number(),
    data: z.object({
        message: z.string(),
        user: UserSchema,
    })
})

export type CompleteProfileResponse = z.infer<typeof CompleteProfileResponseSchema>;

export const UserListItemSchema = UserSchema.extend({
    email: z.string().email().nullable(),
    biography: z.string().nullable(),
    isVerifiedPhoneNumber: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    otp: z.object({
        code: z.number(),
        expiresIn: z.string().datetime(),
    }),
    resetLink: z.string().nullable(),
    __v: z.number(),
});

export const GetUsersListResponseSchema = createApiResponseSchema(
    z.object({
        users: z.array(UserListItemSchema),
    })
);

export type UserListItem = z.infer<typeof UserListItemSchema>;
export type GetUsersListResponse = z.infer<typeof GetUsersListResponseSchema>;
