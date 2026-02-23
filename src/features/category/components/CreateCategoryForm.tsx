import { useCreateCategory } from "@/features/category/api/useCreateCategory.ts";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { type Category, CategorySchema } from "@/features/category/schemas/category.schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/ui/TextField.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { RadioGroup } from "@/components/ui/RadioGroup.tsx";
import { Tag, Plus, Info } from "lucide-react";

type CreateCategoryProps = {
    onCreateCategorySuccess: () => void
}

export const CreateCategoryForm = ({ onCreateCategorySuccess }: CreateCategoryProps) => {
    const { mutateAsync, isPending } = useCreateCategory();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<Category>({
        resolver: zodResolver(CategorySchema),
        defaultValues: { title: "", description: "", englishTitle: "", type: undefined }
    });

    const onSubmit = (data: Category) => {
        const promise = mutateAsync(data);
        toast.promise(promise, {
            loading: 'در حال ارسال اطلاعات',
            success: (res) => {
                onCreateCategorySuccess();
                reset();
                return res.data.message || "دسته بندی با موفقیت ثبت شد";
            },
            error: (err) => err.response?.data?.message || "اختلال در سیستم فرستنده!",
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10 border-r-4 border-brand-primary pr-6">
                <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
                    <Tag className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white">مدیریت دسته‌بندی‌ها</h2>
                    <p className="text-brand-text-muted text-sm mt-1">ایجاد طبقه‌بندی جدید برای پروژه‌ها</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-brand-surface/40 backdrop-blur-xl border border-brand-border p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="space-y-6 relative z-10">
                    <TextField
                        {...register('title')}
                        label="عنوان فارسی"
                        placeholder="مثلاً: برنامه نویسی"
                        error={errors.title?.message}
                    />

                    <TextField
                        {...register('englishTitle')}
                        label="عنوان انگلیسی (Slug)"
                        placeholder="مثلاً: programming"
                        error={errors.englishTitle?.message}
                    />
                </div>

                <div className="space-y-6 relative z-10">
                    <TextField
                        {...register('description')}
                        label="توضیحات تکمیلی"
                        placeholder="در مورد این دسته بندی کمی بنویسید..."
                        error={errors.description?.message}
                    />

                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                label="تخصیص به بخش"
                                name={field.name}
                                options={[
                                    { label: "پروژه", value: "project" },
                                    { label: "پست", value: "post" },
                                    { label: "کامنت", value: "comment" },
                                    { label: "تیکت", value: "ticket" },
                                ]}
                                value={field.value}
                                onChange={field.onChange}
                                orientation="horizontal"
                                error={errors.type?.message}
                            />
                        )}
                    />
                </div>

                <div className="md:col-span-2 pt-6 border-t border-brand-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div
                        className="flex items-center gap-2 text-brand-text-muted text-xs bg-white/5 px-4 py-2 rounded-full">
                        <Info className="w-4 h-4 text-brand-primary"/>
                        <span>ورودی‌ها بر اساس استانداردهای سیستمی بررسی می‌شوند.</span>
                    </div>

                    <Button
                        type="submit"
                        isLoading={isPending}
                        disabled={isPending}
                        className="w-full sm:w-64 h-14 text-lg shadow-lg shadow-brand-primary/20"
                    >
                        <Plus className="w-5 h-5 ml-2" />
                        ثبت دسته بندی
                    </Button>
                </div>
            </form>
        </div>
    );
}
