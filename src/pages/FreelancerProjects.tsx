import { useState, Suspense } from "react";
import { AsyncBoundary } from "@/components/shared/AsyncBoundary";
import { FreelancerProjectListSkeleton } from "@/features/project/components/skeletons/FreelancerProjectListSkeleton";
import { FreelancerProjectsList } from "@/features/project/components/FreelancerProjectsList";
import { StatusToggleGroup } from "@/features/project/components/StatusToggleGroup";
import { CreateProposalDialog } from "@/features/proposal/components/CreateProposalDialog";
import { useCreateProposal } from "@/features/proposal/api/useCreateProposal";
import { SortFilter } from "@/features/project/SortFilter";
import { CategoryFilter } from "@/features/category/components/CategoryFilter";

type ProjectData = {
    id: string;
    title: string;
}

export const FreelancerProjects = () => {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { mutateAsync, isPending } = useCreateProposal();

    const handleOpenProposalDialog = (data: ProjectData) => {
        setSelectedProject(data);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedProject(null);
    };

    return (
        <section className="container mx-auto space-y-10 animate-in fade-in duration-1000">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-0">
                <h1 className="text-2xl font-bold text-brand-text">لیست پروژه‌ها</h1>
                <div className="flex flex-col sm:flex-row gap-2">
                    <StatusToggleGroup />
                    <SortFilter />
                    <Suspense fallback={<div className="w-48 h-12 animate-pulse bg-white/5 rounded-xl border border-gray-800" />}>
                        <CategoryFilter />
                    </Suspense>
                </div>
            </div>

            <div className="w-full overflow-hidden animate-in fade-in slide-in-from-bottom-10 delay-300 duration-1000 fill-mode-both">
                <AsyncBoundary
                    fallback={<FreelancerProjectListSkeleton />}
                    errorMessage="خطای سیستمی در دریافت لیست پروژه‌ها"
                >
                    <FreelancerProjectsList onActionClick={handleOpenProposalDialog} />
                </AsyncBoundary>
            </div>

            {selectedProject && (
                <CreateProposalDialog
                    projectId={selectedProject.id}
                    projectTitle={selectedProject.title}
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onClose={handleCloseDialog}
                    onSubmitAction={(id, formData) => {
                        return mutateAsync({
                            projectId: id,
                            ...formData
                        });
                    }}
                    isLoading={isPending}
                />
            )}
        </section>
    );
};
