import { useCompleteProfile } from "@/features/user/api/useCompleteProfile.ts";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type CompleteProfile,
    CompleteProfileSchema
} from "@/features/user/schemas/user.schema.ts";
import { toast } from "sonner";
import { TextField } from "@/components/ui/TextField.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { RadioGroup } from "@/components/ui/RadioGroup.tsx";

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
        defaultValues: {
            name: "",
            email: "",
            role: undefined,
        },
    })

    const onSubmit = (data: CompleteProfile) => {
        const promise = mutateAsync(data);

        toast.promise(promise, {
            loading: 'درحال بررسی',
            success: (res) => {
                onCompleteSuccess();
                return res.data.message;
            },
            error: (err) => {
                return err.response?.data?.message;
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TextField
                {...register('name')}
                label="نام و نام خانوادگی"
                placeholder="نام و نام خانوادگی خود را وارد کنید"
                error={errors.name?.message}
            />
            <TextField
                {...register('email')}
                label="ایمیل"
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
            <Button
                type="submit"
                isLoading={ isPending }
                disabled={ isPending }
            >
                تایید
            </Button>
        </form>
    )
}
