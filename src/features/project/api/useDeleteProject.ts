import { apiClient } from "@/services/api-client";
import { SuccessMessageResponseSchema, type SuccessMessageResponse } from "@/lib/schemas/api.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/config/query-keys";
import { isAxiosError } from "axios";

export const deleteProject = async (id: string): Promise<SuccessMessageResponse> => {
    const response = await apiClient.delete(`/project/${id}`);
    const result = SuccessMessageResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[حذف پروژه]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای تاییدیه با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.project.ownerList()
            });
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error(`[خطای حذف پروژه]: خطای Axios - ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        }
    })
}
