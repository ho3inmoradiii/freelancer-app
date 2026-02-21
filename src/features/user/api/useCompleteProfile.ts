import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { apiClient } from "@/services/api-client";
import {
    CompleteProfileResponseSchema,
    type CompleteProfileResponse,
    type CompleteProfile
} from "@/features/user/schemas/user.schema.ts";
import { queryKeys } from "@/config/query-keys.ts";

export const completeProfile = async (data: CompleteProfile): Promise<CompleteProfileResponse> => {
    const response = await apiClient.post('/user/complete-profile', data);
    const result = CompleteProfileResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[تکمیل پروفایل]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای تاییدیه با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useCompleteProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: completeProfile,
        onSuccess: (responseData) => {
            queryClient.setQueryData(queryKeys.user.profile(), responseData.data.user)
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error(`[خطای تکمیل پروفایل]: خطای Axios - ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        }
    })
}
