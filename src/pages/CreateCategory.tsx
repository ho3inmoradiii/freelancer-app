import { CreateCategoryForm } from "@/features/category/components/CreateCategoryForm.tsx";
import { CategoryList } from "@/features/category/components/CategoryList.tsx";
import { useCreateCategory } from "@/features/category/api/useCreateCategory.ts";

export const CreateCategory = () => {
    const { mutateAsync, isPending } = useCreateCategory();

    return (
        <section className="py-10 container mx-auto px-4 max-w-6xl space-y-20 animate-in fade-in duration-1000">
            <div className="relative">
                <CreateCategoryForm
                    onSubmitAction={(formData) => mutateAsync(formData)}
                    isLoading={isPending}
                    formTitle="مدیریت دسته‌بندی‌ها"
                />
                <div className="absolute -bottom-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent opacity-50" />
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-10 delay-300 duration-1000 fill-mode-both">
                <CategoryList />
            </div>
        </section>
    );
};
