import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config/query-keys";
import {
    type ProjectListResponse,
    projectListResponseSchema
} from "@/features/project/schemas/project.schema";
import { apiClient } from "@/services/api-client";

export const getOwnerProjects = async (): Promise<ProjectListResponse> => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // throw new Error("یک خطای عمدی برای تست سیستم مدیریت خطا رخ داد!");
    const response = await apiClient.get('/project/owner-projects');
    const result = projectListResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[لیست پروژه ها]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای گرفته شده با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useOwnerProjects = () => {
    return useSuspenseQuery({
        queryKey: queryKeys.project.ownerList(),
        queryFn: getOwnerProjects,
        staleTime: 1000 * 60 * 10,
    })
}
