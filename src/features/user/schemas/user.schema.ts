import { z } from 'zod';

export const UserSchema = z.object({
    _id: z.string(),
    phoneNumber: z.string(),
    role: z.enum(['OWNER', 'ADMIN', 'FREELANCER']),
    isActive: z.boolean(),
    status: z.number(),
});

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
        .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشه!"),
    email: z.string()
        .trim()
        .toLowerCase()
        .email("ایمیل درستی رو وارد کنید"),
    role: z.enum(["OWNER", "FREELANCER"], {
        errorMap: () => ({ message: "انتخاب یکی از نقش ها اجباری است!" }),
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
