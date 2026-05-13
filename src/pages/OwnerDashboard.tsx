import { Briefcase, CheckCircle, FileText } from "lucide-react";
import { useOwnerProjects } from "@/features/project/api/useOwnerProjects";
import { StatCard } from "@/components/shared/StatCard";

export const OwnerDashboard = () => {
    const { data: response} = useOwnerProjects();
    const projects = response?.data?.projects || [];

    const totalProjects = projects.length;

    const assignedProjects = projects.filter(p => p.freelancer !== null).length;

    const totalProposals = projects.reduce((acc, project) => acc + (project.proposals?.length || 0), 0);

    return (
        <div className="w-full min-w-0 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">داشبورد کارفرما</h3>
                <span className="text-sm text-brand-text-muted mt-1">خلاصه وضعیت پروژه‌های شما</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="کل پروژه‌ها"
                    value={totalProjects}
                    icon={Briefcase}
                    colorClassName="text-blue-400"
                    iconBgClassName="bg-blue-500/10"
                />

                <StatCard
                    title="پروژه‌های واگذار شده"
                    value={assignedProjects}
                    icon={CheckCircle}
                    colorClassName="text-green-400"
                    iconBgClassName="bg-green-500/10"
                />

                <StatCard
                    title="کل درخواست‌ها (پروپوزال‌ها)"
                    value={totalProposals}
                    icon={FileText}
                    colorClassName="text-orange-400"
                    iconBgClassName="bg-orange-500/10"
                />
            </div>
        </div>
    );
};
