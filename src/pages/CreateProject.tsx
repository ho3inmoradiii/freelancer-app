import { ProjectForm } from "@/features/project/components/ProjectForm.tsx";
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "@/features/project/api/useCreateProject";

export const CreateProject = () => {
    const navigate = useNavigate();
    const { mutateAsync, isPending } = useCreateProject();

    return (
        <section className="container mx-auto max-w-6xl animate-in fade-in duration-1000">
            <ProjectForm
                formTitle="اضافه کردن پروژه جدید"
                btnText="ایجاد پروژه"
                loadingText="در حال ثبت..."
                successMessage="پروژه با موفقیت ثبت شد"
                errorMessage="اختلال در ثبت پروژه!"
                isLoading={isPending}
                onSubmitAction={(data) => mutateAsync(data)}
                onSuccessCallback={() => navigate('/owner/projects')}
            />
        </section>
    );
}
