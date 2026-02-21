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
