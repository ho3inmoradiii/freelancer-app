import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AsyncBoundary } from "@/components/shared/AsyncBoundary";
import { ProjectProposalsContent } from "@/features/project/components/ProjectProposalsContent";
import { ProjectProposalsSkeleton } from "@/features/project/components/skeletons/ProjectProposalsSkeleton";
import { ArrowRight } from "lucide-react";
import { ChangeProposalStatusDialog } from "@/features/proposal/components/ChangeProposalStatusDialog";
import type { ProposalStatusType } from "@/features/proposal/constants/proposal-statuses";
import { useChangeProposalStatus } from "@/features/proposal/api/useChangeProposalStatus";

type SelectedProposalType = {
    id: string;
    status: ProposalStatusType;
    freelancerName: string;
    projectId: string;
};

export const ProjectProposals = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [projectTitle, setProjectTitle] = useState<string>("");
    const [selectedProposal, setSelectedProposal] = useState<SelectedProposalType | null>(null);

    const navigate = useNavigate();

    const { mutateAsync: changeStatusAsync, isPending } = useChangeProposalStatus(projectId || "");

    const handleSubmitStatus = (newStatus: number) => {
        if (!selectedProposal) return Promise.reject();

        return changeStatusAsync({
            proposalId: selectedProposal.id,
            projectId: selectedProposal.projectId,
            status: newStatus as ProposalStatusType
        });
    };

    return (
        <section className="container mx-auto space-y-10 animate-in fade-in duration-1000">
            {/* Header Section */}
            <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-brand-border/30 pb-10">
                <div>
                    <h1 className="text-2xl font-bold text-brand-text mb-2">
                        درخواست‌های پروژه {projectTitle && <span className="text-brand-primary">«{projectTitle}»</span>}
                    </h1>
                    <p className="text-sm text-brand-text/60">
                        در این بخش می‌توانید درخواست‌های ارسال شده برای این پروژه را بررسی کنید.
                    </p>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-medium text-brand-text/80 hover:text-brand-primary transition-colors px-4 py-2 rounded-lg border border-brand-border/30 hover:border-brand-primary/50 bg-brand-surface/50 hover:bg-brand-surface cursor-pointer"
                >
                    <span>بازگشت</span>
                    <ArrowRight className="w-4 h-4"/>
                </button>
            </div>

            <div
                className="w-full overflow-hidden animate-in fade-in slide-in-from-bottom-10 delay-300 duration-1000 fill-mode-both">
                <AsyncBoundary
                    fallback={<ProjectProposalsSkeleton/>}
                    errorMessage="خطای سیستمی در دریافت اطلاعات پروژه"
                >
                    {projectId && (
                        <ProjectProposalsContent
                            projectId={projectId}
                            onProjectLoad={setProjectTitle}
                            onChangeStatusClick={(proposalInfo) => setSelectedProposal(proposalInfo)}
                        />
                    )}
                </AsyncBoundary>
            </div>

            {selectedProposal && (
                <ChangeProposalStatusDialog
                    isOpen={!!selectedProposal}
                    onClose={() => setSelectedProposal(null)}
                    proposalId={selectedProposal.id}
                    currentStatus={selectedProposal.status}
                    freelancerName={selectedProposal.freelancerName}
                    projectId={selectedProposal.projectId}
                    isLoading={isPending}
                    onSubmitAction={handleSubmitStatus}
                />
            )}
        </section>
    );
};
