import { apiClient } from "@/services/api-client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config/query-keys";
import {
    GetProjectResponseSchema,
    type GetProjectResponse
} from "@/features/project/schemas/project.schema";

export const getProjectProposals = async (id: string): Promise<GetProjectResponse> => {
    const response = await apiClient.get(`/project/${id}`);
    const result = GetProjectResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[جزئیات پروژه]: عدم تطابق ساختار پاسخ:', result.error.format());
        throw new Error('دیتای گرفته شده با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useProjectProposals = (id: string) => {
    return useSuspenseQuery({
        queryKey: queryKeys.project.detail(id),
        queryFn: () => getProjectProposals(id),
        staleTime: 1000 * 60 * 10,
    })
}
