import { type Login } from "@/features/auth/schemas/auth.schema.ts";

export type PhoneValue = Login['phoneNumber'] | null;
export type AuthStep = 'SEND_OTP' | 'VERIFY_OTP';
export type UnixTimestamp = number | null;
export type AuthState = {
    step: AuthStep;
    phoneNumber: PhoneValue;
    otpExpiryTime: UnixTimestamp;
}
