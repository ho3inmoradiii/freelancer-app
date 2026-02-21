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
    name: z.string().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشه، مورتی!"),
    email: z.string(),
    role: z.enum(["OWNER", "FREELANCER"], {
        errorMap: () => ({ message: "باید یکی از این دوتا بُعد رو انتخاب کنی!" }),
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
