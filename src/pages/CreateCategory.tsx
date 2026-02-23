import { CreateCategoryForm } from "@/features/category/components/CreateCategoryForm.tsx";
import { toast } from "sonner";

export const CreateCategory = () => {
    const handleCreateCategorySuccess = () => {
        toast.success("آماده برای مرحله بعد!");
    }

    return (
        <section className="py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CreateCategoryForm onCreateCategorySuccess={handleCreateCategorySuccess} />
        </section>
    )
}
