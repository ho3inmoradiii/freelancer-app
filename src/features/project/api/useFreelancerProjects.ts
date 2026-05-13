import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config/query-keys";
import {
    type FreelancerProjectListResponse,
    freelancerProjectListResponseSchema
} from "@/features/project/schemas/project.schema";
import { apiClient } from "@/services/api-client";

export const getFreelancerProjects = async (filters: Record<string, string>): Promise<FreelancerProjectListResponse> => {
    const cleanFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "ALL") {
            cleanFilters[key] = value;
        }
    });

    const response = await apiClient.get('/project/list', {
        params: cleanFilters
    });

    const result = freelancerProjectListResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[لیست پروژه‌های فریلنسر]: عدم تطابق ساختار:', result.error.format());
        throw new Error('دیتای گرفته شده با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}


export const useFreelancerProjects = (filters: Record<string, string> = {}) => {
    return useSuspenseQuery({
        queryKey: [...queryKeys.project.freelancerList(), filters],
        queryFn: () => getFreelancerProjects(filters),
        staleTime: 1000 * 60 * 10,
    });
}
