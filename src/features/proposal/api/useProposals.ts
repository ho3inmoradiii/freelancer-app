import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config/query-keys";
import {
    type GetProposals,
    GetProposalsSchema
} from "@/features/proposal/schemas/proposal.schema";
import { apiClient } from "@/services/api-client";

export const getProposals = async (): Promise<GetProposals> => {
    const response = await apiClient.get('/proposal/list');
    const result = GetProposalsSchema.safeParse(response);

    if (!result.success) {
        console.error('[لیست درخواست‌ها]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای گرفته شده با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useProposals = () => {
    return useSuspenseQuery({
        queryKey: queryKeys.proposal.lists(),
        queryFn: getProposals,
        staleTime: 1000 * 60 * 10,
    })
}
