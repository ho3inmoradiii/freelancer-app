import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { apiClient } from "@/services/api-client";
import {
    type CheckOtp,
    type VerifyOtpResponse,
    VerifyOtpResponseSchema
} from "@/features/auth/schemas/auth.schema.ts";
import { queryKeys } from "@/config/query-keys.ts";

export const checkOtp = async (data: CheckOtp): Promise<VerifyOtpResponse> => {
    const response = await apiClient.post('/user/check-otp', data);
    const result = VerifyOtpResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[احراز هویت]: عدم تطابق ساختار پاسخ تاییدیه:', result.error.format());
        throw new Error('دیتای تاییدیه با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useCheckOtp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: checkOtp,
        onSuccess: (responseData) => {
            queryClient.setQueryData(queryKeys.user.profile(), responseData.data.user);
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error(`[خطای احراز هویت]: خطای Axios - ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        }
    });
};
