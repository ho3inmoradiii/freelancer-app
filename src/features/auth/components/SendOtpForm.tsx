import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetOtp } from "@/features/auth/api/useGetOtp.ts";
import { LoginSchema, type Login } from "@/features/auth/schemas/auth.schema.ts";
import { toast } from "sonner";

type OtpProps = {
    handleSuccessOtp: (phoneNumber: Login['phoneNumber']) => void;
};

export const SendOtpForm = ({ handleSuccessOtp }: OtpProps) => {
    const { mutateAsync, isPending } = useGetOtp();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Login>({
        resolver: zodResolver(LoginSchema)
    });

    const onSubmit = (data: Login) => {
        const promise = mutateAsync(data);

        toast.promise(promise, {
            loading: 'در حال ارسال کد به کهکشان...',
            success: () => {
                handleSuccessOtp(data.phoneNumber);
                return "کد تایید با موفقیت ارسال شد";
            },
            error: 'خطا در برقراری ارتباط با مرکز اسناد',
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">شماره تماس</label>
                <input
                    {...register('phoneNumber')}
                    placeholder="0912xxxxxxx"
                    className={`p-2 border rounded-md ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isPending}
                />
                {errors.phoneNumber && (
                    <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className={`w-full py-2 px-4 rounded-md text-white transition-all ${
                    isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {isPending ? 'در حال پردازش...' : 'ارسال کد تایید'}
            </button>
        </form>
    )
}
