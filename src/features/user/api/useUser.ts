import { useSuspenseQuery } from "@tanstack/react-query";
import {
    GetProfileResponseSchema,
    type User
} from "@/features/user/schemas/user.schema";
import { apiClient } from "@/services/api-client";
import { queryKeys } from "@/config/query-keys";
import { isAxiosError } from "axios";


export const getUser = async (): Promise<User | null> => {
    try {
        const response = await apiClient.get('/user/profile');
        const result = GetProfileResponseSchema.safeParse(response);

        if (!result.success) {
            console.error('[اطلاعات کاربر]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
            throw new Error('دیتای گرفته شده با قرارداد Schema مطابقت ندارد!');
        }

        return result.data.data.user;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            if (error.response?.status === 401) {
                return null;
            }
        }

        throw error;
    }
}

export const useUser = () => {
    return useSuspenseQuery({
        queryKey: queryKeys.user.profile(),
        queryFn: getUser,
        staleTime: 10 * 60 * 1000,
        retry: false,
    });
};
