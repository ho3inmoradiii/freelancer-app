import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config/query-keys";
import {
    type GetCategories,
    GetCategoriesSchema
} from "@/features/category/schemas/category.schema";
import { apiClient } from "@/services/api-client";

export const getCategories = async (): Promise<GetCategories> => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // throw new Error("یک خطای عمدی برای تست سیستم مدیریت خطا رخ داد!");
    const response = await apiClient.get('/category/list');
    const result = GetCategoriesSchema.safeParse(response);

    if (!result.success) {
        console.error('[لیست دسته‌بندی‌ها]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای گرفته شده با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useCategories = () => {
    return useSuspenseQuery({
        queryKey: queryKeys.category.all,
        queryFn: getCategories,
        staleTime: 1000 * 60 * 10,
    })
}
