import { useEffect } from "react";
import { useProjectProposals } from "@/features/project/api/useProjectProposals";
import { formatCurrency } from "@/utils/formatters";
import { Database, ListTree } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROPOSAL_STATUS_CONFIG, type ProposalStatusType } from "@/features/proposal/constants/proposal-statuses";

type ProjectProposalsContentProps = {
    projectId: string;
    onProjectLoad?: (title: string) => void;
    onChangeStatusClick: (proposalInfo: { id: string; status: number; freelancerName: string, projectId: string }) => void;
}

export const ProjectProposalsContent = ({ projectId, onProjectLoad, onChangeStatusClick }: ProjectProposalsContentProps) => {
    const { data: response } = useProjectProposals(projectId);

    const project = response?.data?.project;
    const proposals = project?.proposals || [];

    useEffect(() => {
        if (project?.title && onProjectLoad) {
            onProjectLoad(project.title);
        }
    }, [project?.title, onProjectLoad]);

    return (
        <div className="w-full min-w-0 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ListTree className="w-5 h-5 text-brand-primary"/>
                    <h3 className="text-xl font-bold text-white">لیست درخواست‌ها</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-brand-border">
                    <Database className="w-3.5 h-3.5 text-brand-text-muted"/>
                    <span className="text-xs font-mono text-brand-text-muted">{proposals.length} درخواست</span>
                </div>
            </div>

            {/* Table Card */}
            <div className="w-full overflow-hidden bg-brand-surface/10 border border-brand-border rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative">
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 blur-[100px] -z-10"/>

                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[900px] text-right border-collapse whitespace-nowrap">
                        <thead>
                        <tr className="border-b border-brand-border/50 bg-white/[0.02] text-brand-text-muted text-xs uppercase tracking-widest">
                            <th className="p-6 font-black text-center">#</th>
                            <th className="p-6 font-black">فریلنسر</th>
                            <th className="p-6 font-black">توضیحات</th>
                            <th className="p-6 font-black">زمان تحویل</th>
                            <th className="p-6 font-black">هزینه</th>
                            <th className="p-6 font-black">وضعیت</th>
                            <th className="p-6 font-black text-center">عملیات</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border/30">
                        {proposals.map((proposal, index) => {
                            const statusConfig = PROPOSAL_STATUS_CONFIG[proposal.status as ProposalStatusType] || {
                                label: 'نامشخص',
                                className: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                            };

                            return (
                                <tr key={proposal._id}
                                    className="hover:bg-brand-primary/[0.02] transition-all duration-300 group">

                                    <td className="p-6 text-center text-brand-text-muted">{index + 1}</td>

                                    <td className="p-6 text-white font-bold">{proposal.user.name}</td>

                                    <td className="p-6 text-brand-text-muted max-w-xs truncate">{proposal.description}</td>

                                    <td className="p-6 text-center text-white">{proposal.duration} روز</td>

                                    <td className="p-6 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-white font-mono text-sm font-medium">
                                                {formatCurrency(proposal.price)}
                                            </span>
                                            <span className="text-[10px] text-brand-text-muted">تومان</span>
                                        </div>
                                    </td>

                                    <td className="p-6 text-center">
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-medium",
                                            statusConfig.className
                                        )}>
                                            {statusConfig.label}
                                        </span>
                                    </td>

                                    <td className="p-6 text-center">
                                        <button
                                            onClick={() => onChangeStatusClick({
                                                id: proposal._id,
                                                status: proposal.status,
                                                freelancerName: proposal.user.name,
                                                projectId: project._id
                                            })}
                                            className="px-4 py-2 text-xs font-bold text-white transition-colors bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/20 rounded-lg cursor-pointer"
                                        >
                                            تغییر وضعیت
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {proposals.length === 0 && (
                    <div className="p-32 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="p-6 bg-white/5 rounded-full text-brand-text-muted/20">
                            <Database className="w-12 h-12"/>
                        </div>
                        <p className="text-brand-text-muted font-medium">هنوز درخواستی برای این پروژه ثبت نشده است.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
