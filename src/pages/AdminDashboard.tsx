import { Briefcase, FileText, Users } from "lucide-react";
import { useProposals } from "@/features/proposal/api/useProposals";
import { useFreelancerProjects } from "@/features/project/api/useFreelancerProjects";
import { useUsersList } from "@/features/user/api/useUsersList";
import { StatCard } from "@/components/shared/StatCard";

export const AdminDashboard = () => {
    const { data: proposalsResponse } = useProposals();
    const { data: projectsResponse } = useFreelancerProjects();
    const { data: usersResponse } = useUsersList();

    const totalProposals = proposalsResponse?.data?.proposals?.length || 0;
    const totalProjects = projectsResponse?.data?.projects?.length || 0;
    const totalUsers = usersResponse?.data?.users?.length || 0;

    return (
        <div className="w-full min-w-0 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">داشبورد ادمین</h3>
                <span className="text-sm text-brand-text-muted mt-1">خلاصه وضعیت کلی پلتفرم</span>
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
                    title="کل کاربران"
                    value={totalUsers}
                    icon={Users}
                    colorClassName="text-orange-400"
                    iconBgClassName="bg-orange-500/10"
                />

                <StatCard
                    title="کل درخواست‌ها"
                    value={totalProposals}
                    icon={FileText}
                    colorClassName="text-green-400"
                    iconBgClassName="bg-green-500/10"
                />
            </div>
        </div>
    );
};
