import { useState } from "react";
import { SendOtpForm } from "@/features/auth/components/SendOtpForm.tsx";
import { VerifyOtpForm } from "@/features/auth/components/VerifyOtpForm.tsx";
import { type PhoneValue, type AuthStep, type UnixTimestamp } from "@/features/auth/types/auth.types.ts";
import { useGetOtp } from "@/features/auth/api/useGetOtp.ts";
import { toast } from "sonner";

export const AuthPage = () => {
    const [step, setStep] = useState<AuthStep>('SEND_OTP');
    const [phoneNumber, setPhoneNumber] = useState<PhoneValue>(null);
    const [otpExpiryTime, setOtpExpiryTime] = useState<UnixTimestamp>(null);
    const { mutateAsync } = useGetOtp();

    const handleOtp = (phoneNumber: PhoneValue) => {
        setPhoneNumber(phoneNumber);
        setStep('VERIFY_OTP');
        setOtpExpiryTime(Date.now() + 5000);
    }

    const handleResendOtp = () => {
        const promise = mutateAsync({ phoneNumber: phoneNumber });

        toast.promise(promise, {
            loading: 'در حال ارسال...',
            success: () => {
                handleOtp(phoneNumber);
                return "کد جدید ارسال شد";
            },
            error: 'خطا در برقراری ارتباط با مرکز اسناد',
        });
    }

    const handleBackButton = () => {
        setStep('SEND_OTP')
    }

    return (
        <div className="container">
            {
                step === 'SEND_OTP'
                    ?
                    <SendOtpForm
                        handleSuccessOtp={ handleOtp }
                        currentPhoneNumber={ phoneNumber }
                    />
                    :
                    <VerifyOtpForm
                        goToSendOtp={ handleBackButton }
                        phoneNumber={ phoneNumber }
                        otpExpiryTime={ otpExpiryTime }
                        onResendOtp={ handleResendOtp }
                    />
            }
        </div>
    )
}
