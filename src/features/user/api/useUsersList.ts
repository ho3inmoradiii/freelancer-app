import { apiClient } from "@/services/api-client";
import {
    GetUsersListResponseSchema,
    type GetUsersListResponse
} from "@/features/user/schemas/user.schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/config/query-keys";

export const getUsersList = async (): Promise<GetUsersListResponse> => {
    const response = await apiClient.get('/admin/user/list');

    const result = GetUsersListResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[لیست کاربران]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای گرفته شده با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
};

export const useUsersList = () => {
    return useSuspenseQuery({
        queryKey: queryKeys.user.lists(),
        queryFn: getUsersList,
        staleTime: 1000 * 60 * 10,
    })
}
