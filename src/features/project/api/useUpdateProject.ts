import { apiClient } from "@/services/api-client";
import { SuccessMessageResponseSchema, type SuccessMessageResponse } from "@/lib/schemas/api.schemas";
import { type ProjectForm } from "@/features/project/schemas/project.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { queryKeys } from "@/config/query-keys";

type UpdateProjectArgs = {
    id: string;
    data: ProjectForm;
}

export const updateProject = async ({ id, data }: UpdateProjectArgs): Promise<SuccessMessageResponse> => {
    const response = await apiClient.patch(`/project/update/${id}`, data);
    const result = SuccessMessageResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[بروزرسانی پروژه]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای تاییدیه با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProject,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.project.ownerList()
            });

        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error(`[خطای بروزرسانی پروژه]: خطای Axios - ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        }
    })
}
