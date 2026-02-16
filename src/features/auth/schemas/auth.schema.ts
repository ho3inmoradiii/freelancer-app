import { z } from 'zod';

export const LoginSchema = z.object({
    phoneNumber: z
        .string()
        .length(11, { message: "شماره تماس حتما باید 11 رقم باشد" })
        .regex(/^09[0-9]{9}$/, {
            message: "فرمت شماره تماس نامعتبر است (مثال: 09123456789)",
        })
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
    phoneNumber: z
        .string()
        .length(11, { message: "شماره تماس حتما باید 11 رقم باشد" })
        .regex(/^09[0-9]{9}$/, {
            message: "فرمت شماره تماس نامعتبر است (مثال: 09123456789)",
        }),
    otp: z
        .string()
        .length(6, { message: "OTP حتما باید 6 رقم باشد" })
})

export type CheckOtp = z.infer<typeof CheckOtpSchema>;

export const UserSchema = z.object({
    _id: z.string(),
    phoneNumber: z.string(),
    role: z.enum(['OWNER', 'ADMIN', 'FREELANCER']),
    isActive: z.boolean(),
    status: z.number(),
});

export const VerifyOtpResponseSchema = z.object({
    statusCode: z.number(),
    data: z.object({
        message: z.string(),
        user: UserSchema,
    }),
});

export type VerifyOtpResponse = z.infer<typeof VerifyOtpResponseSchema>;
