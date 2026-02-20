import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetOtp } from "@/features/auth/api/useGetOtp.ts";
import { LoginSchema, type Login } from "@/features/auth/schemas/auth.schema.ts";
import { toast } from "sonner";
import { type PhoneValue } from "@/features/auth/types/auth.types.ts";
import { Button } from "@/components/ui/Button.tsx";
import { TextField } from "@/components/ui/TextField.tsx";

type OtpProps = {
    handleSuccessOtp: (phoneNumber: Login['phoneNumber']) => void;
    currentPhoneNumber: PhoneValue
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
        const promise = mutateAsync(data);

        toast.promise(promise, {
            loading: 'در حال ارسال کد',
            success: () => {
                handleSuccessOtp(data.phoneNumber);
                return "کد تایید با موفقیت ارسال شد";
            },
            error: (err) => {
                return err.response?.data?.message;
            },
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
                {...register('phoneNumber')}
                id="phone-number"
                label="شماره تماس"
                placeholder="0912xxxxxxx"
                maxLength={11}
                error={errors.phoneNumber?.message}
                className="text-center tracking-[1em]"
                disabled={isPending}
            />

            <Button type="submit" isLoading={isPending}>
                ارسال کد تایید
            </Button>
        </form>
    )
}
