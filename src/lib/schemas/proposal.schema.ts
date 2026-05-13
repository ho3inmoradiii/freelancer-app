import { z } from "zod";
import { PROPOSAL_STATUS } from "@/features/proposal/constants/proposal-statuses";
import { MiniUserSchema } from "@/lib/schemas/user.schema";

export const ProposalEntitySchema = z.object({
    _id: z.string(),
    price: z.number(),
    duration: z.number(),
    description: z.string(),
    user: z.union([z.string(), MiniUserSchema]),
    status: z.union([
        z.literal(PROPOSAL_STATUS.REJECTED),
        z.literal(PROPOSAL_STATUS.PENDING),
        z.literal(PROPOSAL_STATUS.ACCEPTED)
    ]),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    __v: z.number().optional(),
});

export type ProposalEntity = z.infer<typeof ProposalEntitySchema>;
