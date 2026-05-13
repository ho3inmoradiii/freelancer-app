import { apiClient } from "@/services/api-client";
import { SuccessMessageResponseSchema, type SuccessMessageResponse } from "@/lib/schemas/api.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/config/query-keys";
import { isAxiosError } from "axios";

export const deleteCategory = async (id: string): Promise<SuccessMessageResponse> => {
    const response = await apiClient.delete(`/admin/category/remove/${id}`);
    const result = SuccessMessageResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[حذف دسته‌بندی]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای تاییدیه با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.category.all
            });
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error(`[خطای حذف دسته‌بندی]: خطای Axios - ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        }
    })
}
