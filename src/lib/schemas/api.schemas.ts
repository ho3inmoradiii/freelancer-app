import { z } from "zod";

export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => {
    return z.object({
        statusCode: z.number(),
        data: dataSchema,
    });
};

export const SuccessMessageResponseSchema = createApiResponseSchema(
    z.object({ message: z.string() })
);

export type SuccessMessageResponse = z.infer<typeof SuccessMessageResponseSchema>;
