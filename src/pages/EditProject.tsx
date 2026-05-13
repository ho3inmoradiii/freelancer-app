import { ProjectForm } from "@/features/project/components/ProjectForm";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateProject } from "@/features/project/api/useUpdateProject";
import {useProjectProposals} from "@/features/project/api/useProjectProposals";


export const  EditProject = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const { data: response } = useProjectProposals(projectId);

    const { mutateAsync, isPending } = useUpdateProject();

    const selectedProject = response.data.project;

    if (!selectedProject) {
        return <div className="p-20 text-center text-white text-xl">پروژه مورد نظر یافت نشد.</div>;
    }

    const initialData = {
        title: selectedProject.title,
        description: selectedProject.description,
        budget: selectedProject.budget.toString(),
        tags: selectedProject.tags,
        category: typeof selectedProject.category === 'object' ? selectedProject.category._id : selectedProject.category,
        deadline: selectedProject.deadline ? new Date(selectedProject.deadline) : null,
    };

    return (
        <section className="container mx-auto max-w-6xl animate-in fade-in duration-1000">
            <ProjectForm
                formTitle={`ویرایش ${selectedProject.title}`}
                btnText="ثبت تغییرات"
                loadingText="در حال بروزرسانی..."
                successMessage="پروژه با موفقیت بروزرسانی شد"
                errorMessage="اختلال در بروزرسانی پروژه!"
                initialData={initialData}
                isLoading={isPending}
                onSubmitAction={(data) => mutateAsync({ id: projectId!, data })}
                onSuccessCallback={() => navigate('/owner/projects')}
            />
        </section>
    );
};
