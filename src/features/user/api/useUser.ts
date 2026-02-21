import { useQuery } from "@tanstack/react-query";
import { GetProfileResponseSchema, type User } from "@/features/user/schemas/user.schema.ts";
import { apiClient } from "@/services/api-client.ts";
import { queryKeys } from "@/config/query-keys.ts";


export const getUser = async (): Promise<User> => {
    const response = await apiClient.get('/user/profile');
    const result = GetProfileResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[اطلاعات کاربر]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای گرفته شده با قرارداد Schema مطابقت ندارد!');
    }

    return result.data.data.user;
}

export const useUser = () => {
    return useQuery({
        queryKey: queryKeys.user.profile(),
        queryFn: getUser,
    });
};
