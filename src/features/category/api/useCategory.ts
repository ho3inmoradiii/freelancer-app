import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config/query-keys";
import {
    type GetCategory,
    GetCategorySchema
} from "@/features/category/schemas/category.schema";
import { apiClient } from "@/services/api-client";

export const getCategory = async (id: string): Promise<GetCategory> => {
    const response = await apiClient.get(`/category/${id}`);

    const result = GetCategorySchema.safeParse(response);

    if (!result.success) {
        console.error('[دریافت دسته‌بندی]: عدم تطابق ساختار پاسخ:', result.error.format());
        throw new Error('دیتای گرفته شده با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useCategory = (id: string) => {
    return useSuspenseQuery({
        queryKey: queryKeys.category.detail(id),
        queryFn: () => getCategory(id),
        staleTime: 1000 * 60 * 10,
    })
}
