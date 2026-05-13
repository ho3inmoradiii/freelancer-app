import { apiClient } from "@/services/api-client";
import { queryKeys } from "@/config/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { type CreateProposalDto } from "@/features/proposal/schemas/proposal.schema";
import { SuccessMessageResponseSchema, type SuccessMessageResponse } from "@/lib/schemas/api.schemas";

export const createProposal = async (data: CreateProposalDto): Promise<SuccessMessageResponse> => {
    const response = await apiClient.post('/proposal/add', data);
    const result = SuccessMessageResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[ثبت پروپوزال]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای تاییدیه با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useCreateProposal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProposal,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.proposal.lists(),
            });
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error(`[خطای ثبت پروپوزال]: خطای Axios - ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        }
    })
}
