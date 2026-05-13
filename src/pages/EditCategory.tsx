import { CreateCategoryForm } from "@/features/category/components/CreateCategoryForm";
import { useParams, useNavigate } from "react-router-dom";
import { useCategory } from "@/features/category/api/useCategory";
import { useUpdateCategory } from "@/features/category/api/useUpdateCategory";

export const EditCategory = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams();

    const { data: response } = useCategory(categoryId);
    const selectedCategory = response.data.category;

    const { mutateAsync, isPending } = useUpdateCategory();

    if (!selectedCategory) {
        return <div className="p-20 text-center text-white text-xl">دسته‌بندی مورد نظر یافت نشد.</div>;
    }

    return (
        <section className="container mx-auto space-y-20 animate-in fade-in duration-1000">
            <CreateCategoryForm
                formTitle={ `ویرایش ${ selectedCategory.title }` }
                selectedCategory={selectedCategory}
                btnText="ثبت تغییرات"
                onSubmitAction={(formData) => mutateAsync({ id: categoryId!, data: formData })}
                onSuccessCallback={() => navigate('/admin/category')}
                isLoading={isPending}
            />
        </section>
    );
};
