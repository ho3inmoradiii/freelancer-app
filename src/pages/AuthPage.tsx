import { useState } from "react";
import { SendOtpForm } from "@/features/auth/components/SendOtpForm.tsx";
import { VerifyOtpForm } from "@/features/auth/components/VerifyOtpForm.tsx";
import { type PhoneValue, type AuthState } from "@/features/auth/types/auth.types.ts";
import { useGetOtp } from "@/features/auth/api/useGetOtp.ts";
import { toast } from "sonner";
import { storage } from "@/utils/storage.ts";
import { type VerifyOtpResponse } from "@/features/auth/schemas/auth.schema.ts";
import { useNavigate } from 'react-router-dom';

const expiryTime = 90000;

const getInitialAuthState = () => {
    const otpDataSaved = storage.get('otpData');
    if (otpDataSaved) {
        if (Date.now() < otpDataSaved.otpExpiryTime) {
            return { step: 'VERIFY_OTP', phoneNumber: otpDataSaved.phoneNumber, otpExpiryTime: otpDataSaved.otpExpiryTime }
        }
        storage.remove('otpData');
        return { step: 'SEND_OTP', phoneNumber: otpDataSaved.phoneNumber, otpExpiryTime: null }
    } else {
        return { step: 'SEND_OTP', phoneNumber: null, otpExpiryTime: null };
    }
}

export const AuthPage = () => {
    const [authState, setAuthState] = useState<AuthState>(() => getInitialAuthState());

    const { mutateAsync } = useGetOtp();

    const navigate = useNavigate();

    const handleOtp = (phoneNumber: PhoneValue) => {
        const targetTime = Date.now() + expiryTime;
        setAuthState({step: 'VERIFY_OTP', phoneNumber: phoneNumber, otpExpiryTime: targetTime});
        storage.set('otpData', { phoneNumber, otpExpiryTime: targetTime });
    }

    const handleResendOtp = () => {
        const promise = mutateAsync({ phoneNumber: authState.phoneNumber });

        toast.promise(promise, {
            loading: 'در حال ارسال...',
            success: () => {
                handleOtp(authState.phoneNumber);
                return "کد جدید ارسال شد";
            },
            error: 'خطا در برقراری ارتباط با مرکز اسناد',
        });
    }

    const handleBackButton = () => {
        setAuthState({...authState, step: 'SEND_OTP' });
        storage.remove('otpData');
    }

    const handleVerifySuccess = (res: VerifyOtpResponse) => {
        storage.remove('otpData');
        if (!res.data.user.isActive) navigate('/complete-profile')
        else navigate('/dashboard')
    }

    return (
        <div className="container">
            {
                authState.step === 'SEND_OTP'
                    ?
                    <SendOtpForm
                        handleSuccessOtp={ handleOtp }
                        currentPhoneNumber={ authState.phoneNumber }
                    />
                    :
                    <VerifyOtpForm
                        goToSendOtp={ handleBackButton }
                        phoneNumber={ authState.phoneNumber }
                        otpExpiryTime={ authState.otpExpiryTime }
                        onResendOtp={ handleResendOtp }
                        onVerifySuccess={ handleVerifySuccess }
                    />
            }
        </div>
    )
}
