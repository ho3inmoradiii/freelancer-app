import { apiClient } from "@/services/api-client";
import { type Category } from "@/features/category/schemas/category.schema";
import { SuccessMessageResponseSchema, type SuccessMessageResponse } from "@/lib/schemas/api.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { queryKeys } from "@/config/query-keys";

export const createCategory = async (data: Category): Promise<SuccessMessageResponse> => {
    const response = await apiClient.post('/admin/category/add', data);
    const result = SuccessMessageResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[اضافه کردن دسته‌بندی]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای تاییدیه با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.category.all
            });
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error(`[خطای اضافه کردن دسته‌بندی]: خطای Axios - ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        }
    })
}
