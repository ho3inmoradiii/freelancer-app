import { useProposals } from "@/features/proposal/api/useProposals";
import { ListTree, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatters";
import { PROPOSAL_STATUS_CONFIG } from "@/features/proposal/constants/proposal-statuses";

export const ProposalList = () => {
    const { data: response } = useProposals();
    const proposals = response?.data?.proposals || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                    <ListTree className="w-5 h-5 text-brand-primary" />
                    <h3 className="text-xl font-bold text-white">لیست درخواست‌ها</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-brand-border">
                    <Database className="w-3.5 h-3.5 text-brand-text-muted" />
                    <span className="text-xs font-mono text-brand-text-muted">{proposals.length} درخواست</span>
                </div>
            </div>

            <div className="overflow-hidden bg-brand-surface/10 border border-brand-border rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative">
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 blur-[100px] -z-10" />

                <table className="w-full text-right border-collapse">
                    <thead>
                    <tr className="border-b border-brand-border/50 bg-white/[0.02] text-brand-text-muted text-xs uppercase tracking-widest">
                        <th className="p-6 font-black">#</th>
                        <th className="p-6 font-black">توضیحات</th>
                        <th className="p-6 font-black text-center">زمان تحویل</th>
                        <th className="p-6 font-black text-center">هزینه</th>
                        <th className="p-6 font-black text-center">وضعیت</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/30">
                    {proposals.map((proposal, index) => {
                        const statusConfig = PROPOSAL_STATUS_CONFIG[proposal.status] || {
                            label: 'نامشخص',
                            className: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                        };

                        return (
                            <tr key={proposal._id}
                                className="hover:bg-brand-primary/[0.02] transition-all duration-300 group">
                                <td className="p-6">
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold group-hover:text-brand-primary transition-colors">
                                            {index + 1}
                                        </span>
                                        <span className="text-[10px] text-brand-text-muted mt-1 opacity-60">
                                            ID: {proposal._id.slice(-6)}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="text-sm text-brand-text-muted line-clamp-1 max-w-xs">
                                        {proposal.description}
                                    </span>
                                </td>
                                <td className="p-6 text-center">
                                    <span className="text-brand-text-muted font-mono text-xs bg-white/5 px-2 py-1 rounded-md">
                                        {proposal.duration} روز
                                    </span>
                                </td>
                                <td className="p-6 text-center">
                                    <span className="text-brand-text-muted font-mono text-xs bg-white/5 px-2 py-1 rounded-md">
                                         {formatCurrency(proposal.price)}تومان
                                    </span>
                                </td>
                                <td className="p-6 text-center">
                                    <span className={cn(
                                        "px-4 py-1.5 rounded-xl text-[10px] font-black border transition-all inline-block",
                                        statusConfig.className
                                    )}>
                                        {statusConfig.label}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

                {proposals.length === 0 && (
                    <div className="p-32 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="p-6 bg-white/5 rounded-full text-brand-text-muted/20">
                            <Database className="w-12 h-12" />
                        </div>
                        <p className="text-brand-text-muted font-medium">درخواستی یافت نشد.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
