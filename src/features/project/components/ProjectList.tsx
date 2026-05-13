import { useState } from "react";
import { useOwnerProjects } from "@/features/project/api/useOwnerProjects";
import { useUpdateProjectStatus } from "@/features/project/api/useUpdateProjectStatus";
import { useDeleteProject } from "@/features/project/api/useDeleteProject";
import { Database, Edit2, ListTree, Trash2, EyeIcon } from "lucide-react";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/shared/ConfirmDeleteDialog";
import { useNavigate, Link } from "react-router-dom";

export const ProjectList = () => {
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const { data: response } = useOwnerProjects();
    const projects = response?.data?.projects || [];

    const { mutateAsync } = useUpdateProjectStatus();
    const { mutateAsync: mutateDeleteProject, isPending } = useDeleteProject();

    const navigate = useNavigate();

    const editProject = (projectId: string) => {
        navigate(`/owner/projects/edit/${projectId}`);
    }

    const changeProjectStatus = (projectId: string, currentStatus: string) => {
        const newStatus = currentStatus === "OPEN" ? "CLOSED" : "OPEN";
        const promise = mutateAsync({id: projectId, newStatus});

        toast.promise(promise, {
            error: (err) => err.response?.data?.message || err.message || 'خطایی رخ داد',
        })
    }

    const deleteProject = () => {
        if (deleteId) {
            const promise = mutateDeleteProject(deleteId, {
                onSuccess: () => {
                    setDeleteId(null);
                }
            });

            toast.promise(promise, {
                loading: 'در حال حذف ',
                success: (res) => res?.data?.message || 'با موفقیت حذف شد',
                error: (err) => err.response?.data?.message || 'خطای غیر منتظره رخ داده است',
            });
        }
    }

    return (
        <div className="w-full min-w-0 space-y-6">
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

                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[900px] text-right border-collapse whitespace-nowrap">
                        <thead>
                        <tr className="border-b border-brand-border/50 bg-white/[0.02] text-brand-text-muted text-xs uppercase tracking-widest">
                            <th className="p-6 font-black">عنوان</th>
                            <th className="p-6 font-black">دسته‌بندی</th>
                            <th className="p-6 font-black">بودجه</th>
                            <th className="p-6 font-black">ددلاین</th>
                            <th className="p-6 font-black">تگ‌ها</th>
                            <th className="p-6 font-black">فریلنسر</th>
                            <th className="p-6 font-black">وضعیت</th>
                            <th className="p-6 font-black text-center">عملیات</th>
                            <th className="p-6 font-black text-center">درخواست‌ها</th>
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
                                        <span
                                            className="text-[10px] text-brand-text-muted opacity-60 font-mono tracking-wider">
                                                ID: {project._id.slice(-6)}
                                            </span>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="p-6">
                                        <span
                                            className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/5 border border-brand-border/50 text-xs font-medium text-brand-text-muted">
                                            {project.category.title}
                                        </span>
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

                                {/* Tags */}
                                <td className="p-6">
                                    <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                        {project.tags.map((tag) => (
                                            <span
                                                className="px-2 py-0.5 rounded-md bg-brand-primary/10 border border-brand-primary/20 text-[11px] text-brand-primary/80 font-medium"
                                                key={tag}>
                                                    {tag}
                                            </span>
                                        ))}
                                    </div>
                                </td>

                                <td className="p-6">
                                    <span
                                        className="text-brand-text-muted text-xs font-medium bg-brand-surface/30 px-2.5 py-1 rounded-md">
                                        {project.freelancer ? project.freelancer.name : '-'}
                                    </span>
                                </td>

                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <Switch
                                            checked={project.status === "OPEN"}
                                            onCheckedChange={() => changeProjectStatus(project._id, project.status)}
                                            className="data-[state=checked]:bg-brand-primary"
                                        />
                                        <span
                                            className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors duration-300 ${
                                                project.status === "OPEN"
                                                    ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                                                    : "bg-white/5 text-brand-text-muted border border-brand-border/50"
                                            }`}
                                        >
                                            {project.status === "OPEN" ? "باز" : "بسته"}
                                        </span>
                                    </div>
                                </td>


                                {/* Actions */}
                                <td className="p-6">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            className="p-2.5 rounded-xl bg-white/5 text-brand-text-muted hover:bg-brand-primary/20 hover:text-brand-primary transition-all group/btn cursor-pointer"
                                            onClick={() => editProject(project._id)}
                                        >
                                            <Edit2 className="w-4 h-4 group-hover/btn:scale-110"/>
                                        </button>
                                        <button
                                            className="p-2.5 rounded-xl bg-white/5 text-brand-text-muted hover:bg-red-500/20 hover:text-red-400 transition-all group/btn cursor-pointer"
                                            onClick={() => setDeleteId(project._id)}
                                        >
                                            <Trash2 className="w-4 h-4 group-hover/btn:scale-110"/>
                                        </button>
                                    </div>
                                </td>

                                <td className="p-6">
                                    <div className="flex items-center justify-center">
                                        <Link
                                            to={`/owner/projects/${project._id}`}
                                            className="p-2.5 rounded-xl bg-white/5 text-brand-text-muted hover:bg-brand-primary/20 hover:text-brand-primary transition-all group/link cursor-pointer block"
                                            title="مشاهده درخواست‌ها"
                                        >
                                            <EyeIcon className="w-4 h-4 group-hover/link:scale-110"/>
                                        </Link>
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
                        <p className="text-brand-text-muted font-medium">پروژه‌ای هنوز ثبت نشده است. اولین پروژه را ثبت
                            کنید.</p>
                    </div>
                )}
            </div>

            <ConfirmDeleteDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={deleteProject}
                entityName={projects.find(p => p._id === deleteId)?.title || ""}
                entityType="پروژه"
                isPending={isPending}
            />
        </div>
    );
};
