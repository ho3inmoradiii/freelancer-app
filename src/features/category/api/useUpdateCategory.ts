import { apiClient } from "@/services/api-client.ts";
import {
    type Category,
    type CategoryResponse,
    CategoryResponseSchema,
} from "@/features/category/schemas/category.schema.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { queryKeys } from "@/config/query-keys.ts";

type UpdateCategoryArgs = {
    id: string;
    data: Category;
}

export const updateCategory = async ({ id, data }: UpdateCategoryArgs): Promise<CategoryResponse> => {
    const response = await apiClient.patch(`/admin/category/update/${id}`, data);
    const result = CategoryResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[بروزرسانی دسته بندی]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای تاییدیه با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.category.all
            });

        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error(`[خطای بروزرسانی دسته بندی]: خطای Axios - ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        }
    })
}
