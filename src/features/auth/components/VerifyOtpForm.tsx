import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckOtpSchema, type CheckOtp } from "@/features/auth/schemas/auth.schema.ts";
import { type PhoneValue } from "@/features/auth/types/auth.types.ts";
import { useCheckOtp } from "@/features/auth/api/useCheckOtp.ts";

type VerifyOtpProps = {
    phoneNumber: PhoneValue;
    goToSendOtp: () => void;
}

export const VerifyOtpForm = ({ phoneNumber, goToSendOtp }: VerifyOtpProps) => {
    const { mutate, isPending } = useCheckOtp();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckOtp>({
        resolver: zodResolver(CheckOtpSchema),
        defaultValues: {
            phoneNumber: phoneNumber || '',
        }
    });

    const onSubmit = (data: CheckOtp) => {
        mutate(data, {
            onSuccess: (responseData) => {
                console.log('[Auth]: Verification successful!', responseData);
            },
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">کد تایید برای شماره زیر ارسال شد:</p>
                <p className="font-mono font-bold text-xl tracking-widest text-blue-400">{phoneNumber}</p>
            </div>

            <input type="hidden" {...register('phoneNumber')} />

            <div className="flex flex-col gap-2">
                <input
                    {...register('otp')}
                    className="w-full p-3 bg-gray-900 rounded border border-gray-700 focus:border-blue-500 transition-all text-center tracking-[1em]"
                    placeholder="000000"
                    maxLength={6}
                />
                {errors.otp && <p className="text-red-500 text-xs">{errors.otp.message}</p>}
            </div>

            <div className="flex flex-col gap-3 pt-2">
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-bold disabled:opacity-50 transition-colors"
                >
                    {isPending ? 'در حال پردازش...' : 'تایید کد و ورود'}
                </button>

                <button
                    type="button"
                    onClick={goToSendOtp}
                    className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    اصلاح شماره تماس / بازگشت
                </button>
            </div>
        </form>
    );
}
