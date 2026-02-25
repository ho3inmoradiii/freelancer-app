import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config/query-keys.ts";
import {
    type GetCategories,
    GetCategoriesSchema
} from "@/features/category/schemas/category.schema.ts";
import { apiClient } from "@/services/api-client.ts";

export const getCategories = async (): Promise<GetCategories> => {
    const response = await apiClient.get('/category/list');
    const result = GetCategoriesSchema.safeParse(response);

    if (!result.success) {
        console.error('[لیست دسته بندی ها]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای گرفته شده با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useCategories = () => {
    return useQuery({
        queryKey: queryKeys.category.all,
        queryFn: getCategories,
    })
}
