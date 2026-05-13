import { CreateCategoryForm } from "@/features/category/components/CreateCategoryForm";
import { CategoryList } from "@/features/category/components/CategoryList";
import { useCreateCategory } from "@/features/category/api/useCreateCategory";
import { CategoryListSkeleton } from "@/features/category/components/skeletons/CategoryListSkeleton";
import { AsyncBoundary } from "@/components/shared/AsyncBoundary";

export const CreateCategory = () => {
    const { mutateAsync, isPending } = useCreateCategory();

    return (
        <section className="container mx-auto space-y-20 animate-in fade-in duration-1000">
            <div className="relative">
                <CreateCategoryForm
                    onSubmitAction={(formData) => mutateAsync(formData)}
                    isLoading={isPending}
                    formTitle="مدیریت دسته‌بندی‌ها"
                />
                <div className="absolute -bottom-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent opacity-50" />
            </div>

            <div className="w-full overflow-hidden animate-in fade-in slide-in-from-bottom-10 delay-300 duration-1000 fill-mode-both">
                <AsyncBoundary
                    fallback={<CategoryListSkeleton />}
                    errorMessage="خطای سیستمی در دریافت لیست دسته‌بندی‌ها"
                >
                    <CategoryList />
                </AsyncBoundary>
            </div>
        </section>
    );
};
