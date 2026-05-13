import { Wallet, CheckCircle, FileText } from "lucide-react";
import { useProposals } from "@/features/proposal/api/useProposals";
import { StatCard } from "@/components/shared/StatCard";
import { formatCurrency } from "@/utils/formatters";

const APPROVED_STATUS = 2;

export const FreelancerDashboard = () => {
    const { data: response } = useProposals();
    const proposals = response?.data?.proposals || [];

    const totalProposals = proposals.length;

    const approvedProposals = proposals.filter(p => p.status === APPROVED_STATUS);
    const approvedProposalsCount = approvedProposals.length;

    const walletBalance = approvedProposals.reduce(
        (acc, proposal) => acc + proposal.price,
        0
    );

    return (
        <div className="w-full min-w-0 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">داشبورد فریلنسر</h3>
                <span className="text-sm text-brand-text-muted mt-1">خلاصه وضعیت درخواست‌های شما</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="کل درخواست‌ها"
                    value={totalProposals}
                    icon={FileText}
                    colorClassName="text-orange-400"
                    iconBgClassName="bg-orange-500/10"
                />

                <StatCard
                    title="درخواست‌های تایید شده"
                    value={approvedProposalsCount}
                    icon={CheckCircle}
                    colorClassName="text-green-400"
                    iconBgClassName="bg-green-500/10"
                />

                <StatCard
                    title="موجودی کیف پول (تومان)"
                    value={formatCurrency(walletBalance)}
                    icon={Wallet}
                    colorClassName="text-cyan-400"
                    iconBgClassName="bg-cyan-500/10"
                />
            </div>
        </div>
    );
};
