import { useState } from "react";
import { SendOtpForm } from "@/features/auth/components/SendOtpForm";
import { VerifyOtpForm } from "@/features/auth/components/VerifyOtpForm";
import type { Login } from "@/features/auth/schemas/auth.schema";
import { useGetOtp } from "@/features/auth/api/useGetOtp";
import { toast } from "sonner";
import { storage } from "@/utils/storage";

const expiryTime = 90000;

type OtpData = {
    phoneNumber: string;
    otpExpiryTime: number;
};

type AuthState =
    | {
        step: 'SEND_OTP';
        phoneNumber: string | null;
        otpExpiryTime: number | null;
      }
    | {
        step: 'VERIFY_OTP';
        phoneNumber: string;
        otpExpiryTime: number;
      };

const getInitialAuthState = (): AuthState => {
    const otpDataSaved = storage.get('otpData') as OtpData | null;

    if (otpDataSaved) {
        if (Date.now() < otpDataSaved.otpExpiryTime) {
            return {
                step: 'VERIFY_OTP',
                phoneNumber: otpDataSaved.phoneNumber,
                otpExpiryTime: otpDataSaved.otpExpiryTime,
            };
        }

        storage.remove('otpData');
        return {
            step: 'SEND_OTP',
            phoneNumber: otpDataSaved.phoneNumber,
            otpExpiryTime: null,
        };
    }

    return {
        step: 'SEND_OTP',
        phoneNumber: null,
        otpExpiryTime: null,
    };
};

export const AuthPage = () => {
    const [authState, setAuthState] = useState<AuthState>(() => getInitialAuthState());

    const { mutateAsync } = useGetOtp();

    const handleOtp = (phoneNumber: Login['phoneNumber']) => {
        const targetTime = Date.now() + expiryTime;
        setAuthState({step: 'VERIFY_OTP', phoneNumber: phoneNumber, otpExpiryTime: targetTime});
        storage.set('otpData', { phoneNumber, otpExpiryTime: targetTime });
    }

    const handleResendOtp = () => {
        const phone = authState?.phoneNumber;

        if (!phone) {
            toast.error("شماره تماس معتبر نیست");
            return;
        }

        const promise = mutateAsync({ phoneNumber: phone }, {
            onSuccess: () => {
                handleOtp(phone);
            }
        });

        toast.promise(promise, {
            loading: 'در حال ارسال...',
            success: 'کد جدید ارسال شد',
            error: 'خطا در برقراری ارتباط با مرکز اسناد',
        });
    }


    const handleBackButton = () => {
        setAuthState({...authState, step: 'SEND_OTP' });
        storage.remove('otpData');
    }

    const handleVerifySuccess = () => {
        storage.remove('otpData');
    };


    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md bg-brand-surface border border-brand-border rounded-2xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">

                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full" />

                <div className="relative z-10">
                    <header className="text-center mb-8">
                        <h1 className="text-2xl font-bold tracking-tight mb-2">خوش آمدید</h1>
                        <p className="text-brand-text-muted text-sm">
                            {authState.step === 'SEND_OTP'
                                ? 'برای ورود شماره موبایل خود را وارد کنید'
                                : 'کد تایید ارسال شده را وارد کنید'}
                        </p>
                    </header>

                    {authState.step === 'VERIFY_OTP' && authState.phoneNumber && authState.otpExpiryTime ? (
                        <VerifyOtpForm
                            goToSendOtp={handleBackButton}
                            phoneNumber={authState.phoneNumber}
                            otpExpiryTime={authState.otpExpiryTime}
                            onResendOtp={handleResendOtp}
                            onVerifySuccess={handleVerifySuccess}
                        />
                    ) : (
                        <SendOtpForm
                            handleSuccessOtp={handleOtp}
                            currentPhoneNumber={authState.step === 'SEND_OTP' ? authState.phoneNumber : null}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
