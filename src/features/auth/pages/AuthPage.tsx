import { useState } from "react";
import { SendOtpForm } from "@/features/auth/components/SendOtpForm.tsx";
import { VerifyOtpForm } from "@/features/auth/components/VerifyOtpForm.tsx";
import { type PhoneValue, type AuthStep } from "@/features/auth/types/auth.types.ts";

export const AuthPage = () => {
    const [step, setStep] = useState<AuthStep>('SEND_OTP');
    const [phoneNumber, setPhoneNumber] = useState<PhoneValue>(null);

    const handleOtp = (phoneNumber: PhoneValue) => {
        setPhoneNumber(phoneNumber);
        setStep('VERIFY_OTP');
    }

    const handleBackButton = () => {
        setStep('SEND_OTP')
    }

    return (
        <div className="container">
            {
                step === 'SEND_OTP' ? <SendOtpForm handleSuccessOtp={ handleOtp } /> : <VerifyOtpForm goToSendOtp={ handleBackButton } phoneNumber={ phoneNumber } />
            }
        </div>
    )
}
