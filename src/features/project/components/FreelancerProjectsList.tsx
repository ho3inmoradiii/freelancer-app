import { useSearchParams } from "react-router-dom";
import { useFreelancerProjects } from "@/features/project/api/useFreelancerProjects";
import { useIsFetching } from "@tanstack/react-query";
import { queryKeys } from "@/config/query-keys";
import { Database, Send, ListTree, Loader2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/utils/formatters";

type FreelancerProjectsListProps = {
    onActionClick: ({ id, title }: { id: string; title: string }) => void;
}

export const FreelancerProjectsList = ({ onActionClick }: FreelancerProjectsListProps) => {
    const [searchParams] = useSearchParams();

    const filters = Object.fromEntries(searchParams.entries());

    const { data: response } = useFreelancerProjects(filters);
    const projects = response?.data?.projects || [];

    const isFetching = useIsFetching({
        queryKey: queryKeys.project.freelancerList()
    });

    return (
        <div className="w-full min-w-0 mt-16 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ListTree className="w-5 h-5 text-brand-primary" />
                    <h3 className="text-xl font-bold text-white">لیست پروژه‌ها</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-brand-border">
                    <Database className="w-3.5 h-3.5 text-brand-text-muted" />
                    <span className="text-xs font-mono text-brand-text-muted">{projects.length} پروژه </span>
                </div>
            </div>

            {/* Table Card */}
            <div className="w-full overflow-hidden bg-brand-surface/10 border border-brand-border rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative">
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 blur-[100px] -z-10"/>

                {isFetching > 0 && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-brand-surface/80 px-3 py-1.5 rounded-full border border-brand-border backdrop-blur-md">
                        <Loader2 className="w-4 h-4 text-brand-primary animate-spin" />
                        <span className="text-xs text-brand-text-muted">در حال بروزرسانی...</span>
                    </div>
                )}

                <div className={`w-full overflow-x-auto transition-opacity duration-300 ${isFetching > 0 ? 'opacity-10 pointer-events-none' : 'opacity-100'}`}>
                    <table className="w-full min-w-[900px] text-right border-collapse whitespace-nowrap">
                        <thead>
                        <tr className="border-b border-brand-border/50 bg-white/[0.02] text-brand-text-muted text-xs uppercase tracking-widest">
                            <th className="p-6 font-black">عنوان</th>
                            <th className="p-6 font-black">بودجه</th>
                            <th className="p-6 font-black">ددلاین</th>
                            <th className="p-6 font-black">وضعیت</th>
                            <th className="p-6 font-black text-center">عملیات</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border/30">
                        {projects.map((project) => (
                            <tr key={project._id}
                                className="hover:bg-brand-primary/[0.02] transition-all duration-300 group">

                                {/* Title */}
                                <td className="p-6">
                                    <div className="flex flex-col gap-1">
                                        <span
                                            className="text-white font-bold group-hover:text-brand-primary transition-colors">
                                            {project.title}
                                        </span>
                                    </div>
                                </td>

                                {/* Budget */}
                                <td className="p-6">
                                    <div className="flex items-center gap-1">
                                            <span className="text-white font-mono text-sm font-medium">
                                                {formatCurrency(project.budget)}
                                            </span>
                                        <span className="text-[10px] text-brand-text-muted">تومان</span>
                                    </div>
                                </td>

                                {/* Deadline */}
                                <td className="p-6">
                                        <span
                                            className="text-brand-text-muted text-xs font-medium bg-brand-surface/30 px-2.5 py-1 rounded-md">
                                            {formatDate(project.deadline)}
                                        </span>
                                </td>

                                {/* Status */}
                                <td className="p-6">
                                    <span
                                        className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors duration-300 ${
                                            project.status === "OPEN"
                                                ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                                                : "bg-white/5 text-brand-text-muted border border-brand-border/50"
                                        }`}
                                    >
                                        {project.status === "OPEN" ? "باز" : "بسته"}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="p-6">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            className="p-2.5 rounded-xl bg-white/5 text-brand-text-muted hover:bg-brand-primary/20 hover:text-brand-primary transition-all group/btn cursor-pointer"
                                            onClick={() => onActionClick({id: project._id, title: project.title})}
                                        >
                                            <Send className="w-4 h-4 group-hover/btn:scale-110"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {projects.length === 0 && (
                    <div className="p-32 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="p-6 bg-white/5 rounded-full text-brand-text-muted/20">
                            <Database className="w-12 h-12"/>
                        </div>
                        <p className="text-brand-text-muted font-medium">پروژه‌ای یافت نشد.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
