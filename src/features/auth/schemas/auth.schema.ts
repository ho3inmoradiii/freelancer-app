import { z } from 'zod';
import { UserSchema } from "@/lib/schemas/user.schema";
import {createApiResponseSchema} from "@/lib/schemas/api.schemas";

const phoneNumberBaseSchema = z
    .string()
    .length(11)
    .regex(/^09[0-9]{9}$/, "فرمت شماره تماس نامعتبر است (مثال: 09123456789)");

export const LoginSchema = z.object({
    phoneNumber: phoneNumberBaseSchema
})

export type Login = z.infer<typeof LoginSchema>;

export const OtpDataSchema = z.object({
    message: z.string(),
    expiresIn: z.number(),
    phoneNumber: z.string(),
})

export const OtpResponseSchema = z.object({
    statusCode: z.number(),
    data: OtpDataSchema,
})

export type OtpResponse = z.infer<typeof OtpResponseSchema>;

export const CheckOtpSchema = z.object({
    phoneNumber: phoneNumberBaseSchema,
    otp: z
        .string()
        .length(6)
})

export type CheckOtp = z.infer<typeof CheckOtpSchema>;

const VerifyUserSchema = UserSchema.extend({
    name: z.string().nullish(),
    biography: z.string().nullable(),
    resetLink: z.string().nullable(),
    isVerifiedPhoneNumber: z.boolean(),
    avatarUrl: z.string().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    otp: z.object({
        code: z.number(),
        expiresIn: z.string()
    }).optional()
});

export const VerifyOtpResponseSchema = createApiResponseSchema(
    z.object({
        message: z.string(),
        user: VerifyUserSchema
    })
);

export type VerifyOtpResponse = z.infer<typeof VerifyOtpResponseSchema>;
