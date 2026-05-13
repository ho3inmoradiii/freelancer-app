import { z } from "zod";

export const RoleEnum = z.enum(['OWNER', 'ADMIN', 'FREELANCER']);

export const UserSchema = z.object({
    _id: z.string(),
    phoneNumber: z.string(),
    role: RoleEnum,
    isActive: z.boolean(),
    status: z.number(),
    name: z.string(),
});

export const MiniUserSchema = z.object({
    _id: z.string(),
    name: z.string(),
    avatarUrl: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;
export type MiniUser = z.infer<typeof MiniUserSchema>;
