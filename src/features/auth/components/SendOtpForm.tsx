import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetOtp } from "@/features/auth/api/useGetOtp";
import { LoginSchema, type Login } from "@/features/auth/schemas/auth.schema";
import { toast } from "sonner";
import { AppButton } from "@/components/ui/AppButton";
import { TextField } from "@/components/ui/TextField";

type OtpProps = {
    handleSuccessOtp: (phoneNumber: Login['phoneNumber']) => void;
    currentPhoneNumber: Login['phoneNumber'] | null
};

export const SendOtpForm = ({ handleSuccessOtp, currentPhoneNumber }: OtpProps) => {
    const { mutateAsync, isPending } = useGetOtp();

    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors },
    } = useForm<Login>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            phoneNumber: currentPhoneNumber
        }
    });

    useEffect(() => {
        setFocus("phoneNumber");
    }, [setFocus])

    const onSubmit = (data: Login) => {
        const promise = mutateAsync(data, {
            onSuccess: () => {
                handleSuccessOtp(data.phoneNumber);
            }
        });

        toast.promise(promise, {
            loading: 'در حال ارسال کد',
            success: () => "کد تایید با موفقیت ارسال شد",
            error: (err) => {
                return err.response?.data?.message;
            },
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <TextField
                {...register('phoneNumber')}
                id="phone-number"
                label="شماره تماس"
                placeholder="0912xxxxxxx"
                maxLength={11}
                error={errors.phoneNumber?.message}
                className="text-center tracking-[2px]"
                disabled={isPending}
            />

            <AppButton
                type="submit"
                isLoading={ isPending }
                disabled={ isPending }
            >
                ارسال کد تایید
            </AppButton>
        </form>
    )
}
