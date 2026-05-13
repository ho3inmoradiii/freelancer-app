import { z } from "zod";
import { moneyFieldSchema } from "@/lib/schemas/common.schema";
import { createApiResponseSchema } from "@/lib/schemas/api.schemas";
import { ProposalEntitySchema } from "@/lib/schemas/proposal.schema";

export const ProposalFormSchema = z.object({
    price: moneyFieldSchema,
    duration: z.coerce.number().min(1, "مدت زمان باید حداقل 1 روز باشد"),
    description: z.string().min(10),
});

export type ProposalForm = z.infer<typeof ProposalFormSchema>;

export const CreateProposalDtoSchema = ProposalFormSchema.extend({
    projectId: z.string(),
});

export type CreateProposalDto = z.infer<typeof CreateProposalDtoSchema>;

export const GetProposalsSchema = createApiResponseSchema(
    z.object({
        proposals: z.array(ProposalEntitySchema),
    })
);

export type GetProposals = z.infer<typeof GetProposalsSchema>;
