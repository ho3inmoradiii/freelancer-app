import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckOtpSchema, type CheckOtp, type Login } from "@/features/auth/schemas/auth.schema";
import { useCheckOtp } from "@/features/auth/api/useCheckOtp";
import { AppButton } from "@/components/ui/AppButton";
import { TextField } from "@/components/ui/TextField";
import { useCountdown } from "@/features/auth/hooks/useCountdown";
import { toast } from "sonner";

type VerifyOtpProps = {
    onResendOtp: () => void;
    phoneNumber: Login['phoneNumber'];
    otpExpiryTime: number | null;
    goToSendOtp: () => void;
    onVerifySuccess: () => void;
}

export const VerifyOtpForm = ({ onResendOtp, phoneNumber, otpExpiryTime, goToSendOtp, onVerifySuccess }: VerifyOtpProps) => {
    const { mutateAsync, isPending } = useCheckOtp();
    const { seconds, isFinished } = useCountdown(otpExpiryTime);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckOtp>({
        resolver: zodResolver(CheckOtpSchema),
        defaultValues: {
            phoneNumber: phoneNumber,
        }
    });

    const onSubmit = (data: CheckOtp) => {
        const promise = mutateAsync(data, {
            onSuccess: () => {
                onVerifySuccess();
            }
        });

        toast.promise(promise, {
            loading: 'در حال بررسی کد...',
            success: () => "خوش آمدید",
            error: (err) => err.response?.data?.message || "خطا در تایید کد",
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white/5 border border-brand-border rounded-xl p-4 text-center">
                <p className="text-[10px] uppercase tracking-widest text-brand-text-muted mb-2">
                    کد تایید به شماره زیر ارسال شد
                </p>
                <div className="flex items-center justify-center gap-3">
                    <span className="font-mono font-bold text-lg text-brand-primary tracking-wider">
                        {phoneNumber}
                    </span>
                    <button
                        type="button"
                        onClick={goToSendOtp}
                        className="text-[10px] text-brand-primary hover:underline"
                    >
                        (ویرایش)
                    </button>
                </div>
            </div>

            <input type="hidden" {...register('phoneNumber')} />

            <TextField
                {...register('otp')}
                id="otp"
                label="کد ۶ رقمی را وارد کنید"
                placeholder="0 0 0 0 0 0"
                maxLength={6}
                error={errors.otp?.message}
                className="text-center text-2xl tracking-[0.5em] font-mono pt-[14px] pb-[10px]"
                disabled={isPending}
            />

            <div className="space-y-4">
                <AppButton
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                >
                    تایید و ورود به سیستم
                </AppButton>

                <div className="flex items-center justify-between px-1">
                    <button
                        type="button"
                        disabled={!isFinished}
                        onClick={onResendOtp}
                        className="text-xs font-medium text-brand-text-muted hover:text-brand-primary disabled:opacity-50 disabled:hover:text-brand-text-muted transition-colors"
                    >
                        {isFinished ? (
                            "ارسال مجدد کد"
                        ) : (
                            <span className="flex items-center gap-2">
                                ارسال مجدد در
                                <span className="text-brand-primary font-mono">{seconds}s</span>
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={goToSendOtp}
                        className="text-xs font-medium text-brand-text-muted hover:text-white transition-colors"
                    >
                        بازگشت
                    </button>
                </div>
            </div>
        </form>
    );
}
