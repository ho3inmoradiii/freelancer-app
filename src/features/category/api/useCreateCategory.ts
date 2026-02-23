import { apiClient } from "@/services/api-client.ts";
import {
    type Category,
    type CategoryResponse,
    CategoryResponseSchema,
} from "@/features/category/schemas/category.schema.ts";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export const createCategory = async (data: Category): Promise<CategoryResponse> => {
    const response = await apiClient.post('/admin/category/add', data);
    const result = CategoryResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[اضافه کردن کتگوری]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای تاییدیه با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useCreateCategory = () => {
    return useMutation({
        mutationFn: createCategory,
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error(`[خطای اضافه کردن کتگوری]: خطای Axios - ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        }
    })
}
