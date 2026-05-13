import { useCompleteProfile } from "@/features/user/api/useCompleteProfile";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type CompleteProfile,
    CompleteProfileSchema
} from "@/features/user/schemas/user.schema";
import { toast } from "sonner";
import { TextField } from "@/components/ui/TextField";
import { AppButton } from "@/components/ui/AppButton";
import { RadioGroup } from "@/components/ui/RadioGroup";

type CompleteProfileProps = {
    onCompleteSuccess: () => void
}

export const CompleteProfileForm = ({ onCompleteSuccess }: CompleteProfileProps) => {
    const { mutateAsync, isPending } = useCompleteProfile();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<CompleteProfile>({
        resolver: zodResolver(CompleteProfileSchema),
        defaultValues: { name: "", email: "", role: undefined },
    });

    const onSubmit = (data: CompleteProfile) => {
        const promise = mutateAsync(data, {
            onSuccess: () => {
                onCompleteSuccess();
            }
        });
        toast.promise(promise, {
            loading: 'در حال ارسال...',
            success: (res) => res.data.message || "اطلاعات شما با موفقیت بروزرسانی شد",
            error: (err) => err.response?.data?.message || "اختلال در سیستم!",
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-lg bg-brand-surface border border-brand-border rounded-2xl p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-primary/10 blur-3xl rounded-full" />

                <div className="relative z-10">
                    <header className="mb-10 text-right">
                        <h2 className="text-2xl font-bold text-white mb-2">تکمیل اطلاعات کاربری</h2>
                    </header>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <TextField
                            {...register('name')}
                            label="نام و نام خانوادگی"
                            placeholder="نام و نام خانوادگی خود را وارد کنید"
                            error={errors.name?.message}
                        />

                        <TextField
                            {...register('email')}
                            label="آدرس ایمیل"
                            placeholder="ایمیل خود را وارد کنید"
                            error={errors.email?.message}
                        />

                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    label="نقش خود را انتخاب کنید"
                                    name={field.name}
                                    options={[
                                        { label: "کارفرما (Owner)", value: "OWNER" },
                                        { label: "فریلنسر (Freelancer)", value: "FREELANCER" },
                                    ]}
                                    value={field.value}
                                    onChange={field.onChange}
                                    orientation="horizontal"
                                    error={errors.role?.message}
                                />
                            )}
                        />

                        <div className="pt-4">
                            <AppButton
                                type="submit"
                                isLoading={isPending}
                                disabled={isPending}
                            >
                                تایید و ورود به داشبورد
                            </AppButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
