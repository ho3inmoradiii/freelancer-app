import { apiClient } from "@/services/api-client.ts";
import { CategoryResponseSchema, type CategoryResponse } from "@/features/category/schemas/category.schema.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/config/query-keys.ts";
import { isAxiosError } from "axios";

export const deleteCategory = async (id: string): Promise<CategoryResponse> => {
    const response = await apiClient.delete(`/admin/category/remove/${id}`);
    const result = CategoryResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[حذف دسته بندی]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
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
                console.error(`[خطای حذف دسته بندی]: خطای Axios - ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        }
    })
}
