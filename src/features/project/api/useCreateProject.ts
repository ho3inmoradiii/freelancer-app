import { apiClient } from "@/services/api-client";
import { queryKeys } from "@/config/query-keys";
import {
    type CreateProjectResponse,
    type ProjectForm,
    CreateProjectResponseSchema
} from "@/features/project/schemas/project.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export const createProject = async (data: ProjectForm): Promise<CreateProjectResponse> => {
    const response = await apiClient.post('project/add', data);
    const result = CreateProjectResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[اضافه کردن پروژه]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای تاییدیه با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.project.ownerList(),
            })
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error(`[خطای اضافه کردن پروژه]: خطای Axios - ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        }
    })
}
