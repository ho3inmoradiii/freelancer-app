import { Database, Users } from "lucide-react";

export const UsersListSkeleton = () => {
    return (
        <div className="w-full min-w-0 space-y-6 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-brand-primary opacity-50" />
                    <div className="h-6 w-32 bg-white/10 rounded-md" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-brand-border">
                    <Database className="w-3.5 h-3.5 text-brand-text-muted opacity-60" />
                    <div className="h-3 w-16 bg-white/5 rounded" />
                </div>
            </div>

            {/* Table Card */}
            <div className="w-full overflow-hidden bg-brand-surface/10 border border-brand-border rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative">
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 blur-[100px] -z-10" />

                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[1000px] text-right border-collapse whitespace-nowrap">
                        <thead>
                        <tr className="border-b border-brand-border/50 bg-white/[0.02] text-xs uppercase tracking-widest">
                            <th className="p-6 font-black text-center"><div className="h-3 w-4 bg-white/5 rounded mx-auto" /></th>
                            <th className="p-6 font-black"><div className="h-3 w-20 bg-white/5 rounded" /></th>
                            <th className="p-6 font-black"><div className="h-3 w-32 bg-white/5 rounded" /></th>
                            <th className="p-6 font-black"><div className="h-3 w-24 bg-white/5 rounded" /></th>
                            <th className="p-6 font-black"><div className="h-3 w-16 bg-white/5 rounded" /></th>
                            <th className="p-6 font-black text-center"><div className="h-3 w-16 bg-white/5 rounded mx-auto" /></th>
                            <th className="p-6 font-black text-center"><div className="h-3 w-20 bg-white/5 rounded mx-auto" /></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border/30">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <tr key={i} className="transition-all duration-300">
                                {/* # */}
                                <td className="p-6 text-center">
                                    <div className="h-4 w-4 bg-white/10 rounded mx-auto" />
                                </td>

                                {/* Name */}
                                <td className="p-6">
                                    <div className="h-5 w-32 bg-white/10 rounded" />
                                </td>

                                {/* Email */}
                                <td className="p-6">
                                    <div className="h-4 w-48 bg-white/5 rounded" />
                                </td>

                                {/* Phone */}
                                <td className="p-6">
                                    <div className="h-4 w-28 bg-white/5 rounded" />
                                </td>

                                {/* Role */}
                                <td className="p-6">
                                    <div className="h-4 w-16 bg-white/10 rounded" />
                                </td>

                                {/* Status */}
                                <td className="p-6 text-center">
                                    <div className="h-6 w-20 bg-white/5 rounded-lg mx-auto" />
                                </td>

                                {/* Actions */}
                                <td className="p-6 text-center">
                                    <div className="h-8 w-24 bg-brand-primary/10 rounded-lg mx-auto" />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
