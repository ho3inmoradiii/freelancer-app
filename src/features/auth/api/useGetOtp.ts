import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/services/api-client";
import { type Login, type OtpResponse, OtpResponseSchema } from "@/features/auth/schemas/auth.schema.ts";
import {isAxiosError} from "axios";

export const getOtp = async (data: Login): Promise<OtpResponse> => {
    const response = await apiClient.post('/user/get-otp', data);
    const result = OtpResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[احراز هویت]: ساختار کد OTP تغییر کرده است:', result.error.format());
        throw new Error('دیتا با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useGetOtp = () => {
    return useMutation({
        mutationFn: getOtp,
        onError: (error) => {
            if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                console.error(`[خطای احراز هویت]: خطای Axios - ${errorMessage}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        }
    })
}
