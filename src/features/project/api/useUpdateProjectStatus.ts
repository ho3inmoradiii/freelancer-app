import { apiClient } from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SuccessMessageResponseSchema, type SuccessMessageResponse } from "@/lib/schemas/api.schemas";
import { queryKeys } from "@/config/query-keys";
import { isAxiosError } from "axios";
import { type ProjectListResponse } from "@/features/project/schemas/project.schema";
import { produce } from "immer";

interface UpdateStatusVariables {
    id: string;
    newStatus: "OPEN" | "CLOSED";
}

export const updateProjectStatus = async ({ id, newStatus }: UpdateStatusVariables): Promise<SuccessMessageResponse> => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // throw new Error("یک خطای عمدی برای تست سیستم مدیریت خطا رخ داد!");
    const response = await apiClient.patch(`/project/${id}`, { status: newStatus });
    const result = SuccessMessageResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[بروزرسانی وضعیت پروژه]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای تاییدیه با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useUpdateProjectStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProjectStatus,

        onMutate: async ({ id, newStatus }) => {
            await queryClient.cancelQueries({ queryKey: queryKeys.project.ownerList() });

            const previousProjects = queryClient.getQueryData<ProjectListResponse>(queryKeys.project.ownerList());

            queryClient.setQueryData<ProjectListResponse>(queryKeys.project.ownerList(), (oldData) => {
                if (!oldData) return oldData;

                return produce(oldData, (draft) => {
                    const project = draft.data?.projects?.find(p => p._id === id);
                    if (project) {
                        project.status = newStatus;
                    }
                });
            });

            return { previousProjects };
        },

        onError: (error, variables, context) => {
            if (context?.previousProjects) {
                queryClient.setQueryData(queryKeys.project.ownerList(), context.previousProjects);
            }

            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error(`[خطای بروزرسانی وضعیت پروژه]: ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.project.ownerList()
            });
        }
    });
};
