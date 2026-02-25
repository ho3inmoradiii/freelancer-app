import { CreateCategoryForm } from "@/features/category/components/CreateCategoryForm";
import { useParams } from "react-router-dom";
import { useCategories } from "@/features/category/api/useCategories.ts";
import { useUpdateCategory } from "@/features/category/api/useUpdateCategory.ts";
import { useNavigate } from "react-router-dom";

export const EditCategory = () => {
    const navigate = useNavigate();
    const { data: response, isLoading: isFetching } = useCategories();
    const categories = response?.data?.categories || [];
    const { categoryId } = useParams();
    const { mutateAsync, isPending } = useUpdateCategory();

    const selectedCategory = categories.find((category) => category._id === categoryId);

    if (isFetching || !selectedCategory) {
        return <div className="p-20 text-center text-white">در حال بازیابی اطلاعات دسته بندی...</div>;
    }

    return (
        <section className="py-10 container mx-auto px-4 max-w-6xl space-y-20 animate-in fade-in duration-1000">
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
