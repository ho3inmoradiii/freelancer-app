import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckOtpSchema, type CheckOtp } from "@/features/auth/schemas/auth.schema.ts";
import { type PhoneValue, type UnixTimestamp } from "@/features/auth/types/auth.types.ts";
import { useCheckOtp } from "@/features/auth/api/useCheckOtp.ts";
import { Button } from "@/components/ui/Button.tsx";
import { TextField } from "@/components/ui/TextField.tsx";
import { useCountdown } from "@/features/auth/hooks/useCountdown.ts";

type VerifyOtpProps = {
    onResendOtp: () => void;
    phoneNumber: PhoneValue;
    otpExpiryTime: UnixTimestamp;
    goToSendOtp: () => void;
}

export const VerifyOtpForm = ({ onResendOtp, phoneNumber, otpExpiryTime, goToSendOtp }: VerifyOtpProps) => {
    const { mutate, isPending } = useCheckOtp();

    const { seconds, isFinished } = useCountdown(otpExpiryTime);

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

            <TextField
                {...register('otp')}
                placeholder="000000"
                maxLength={6}
                error={errors.otp?.message}
                className="text-center tracking-[1em]"
            />

            <div className="flex flex-col gap-3 pt-2">
                <Button type="submit" isLoading={isPending}>تایید کد و ورود</Button>
                <Button type="button" variant="secondary" onClick={goToSendOtp}>
                    اصلاح شماره تماس / بازگشت
                </Button>
                <Button
                    type="button"
                    disabled={ !isFinished }
                    onClick={ onResendOtp }
                >
                    {isFinished ? 'ارسال مجدد کد' : `ارسال مجدد در ${seconds} ثانیه`}
                </Button>
            </div>
        </form>
    );
}
