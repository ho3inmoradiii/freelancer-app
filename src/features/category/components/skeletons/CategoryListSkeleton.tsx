import { Database, ListTree } from "lucide-react";

export const CategoryListSkeleton = () => {
    return (
        <div className="mt-16 space-y-6 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ListTree className="w-5 h-5 text-brand-primary opacity-50" />
                    <div className="h-5 w-40 bg-white/10 rounded" />
                </div>

                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-brand-border">
                    <Database className="w-3.5 h-3.5 text-brand-text-muted opacity-60" />
                    <div className="h-3 w-12 bg-white/5 rounded" />
                </div>
            </div>

            {/* Table container */}
            <div className="overflow-hidden bg-brand-surface/10 border border-brand-border rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative">
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 blur-[100px] -z-10" />

                <table className="w-full border-collapse text-right">
                    <thead>
                    <tr className="border-b border-brand-border/50 bg-white/[0.02] text-xs uppercase tracking-widest">
                        <th className="p-6 font-black">
                            <div className="h-3 w-12 bg-white/5 rounded" />
                        </th>
                        <th className="p-6 font-black">
                            <div className="h-3 w-16 bg-white/5 rounded" />
                        </th>
                        <th className="p-6 font-black text-center">
                            <div className="h-3 w-10 bg-white/5 rounded mx-auto" />
                        </th>
                        <th className="p-6 font-black text-center">
                            <div className="h-3 w-14 bg-white/5 rounded mx-auto" />
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-brand-border/30">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <tr
                            key={i}
                            className="transition-all group hover:bg-brand-primary/[0.02]"
                        >
                            {/* Title column */}
                            <td className="p-6">
                                <div className="space-y-2">
                                    <div className="h-4 w-40 bg-white/10 rounded" />
                                    <div className="h-2 w-24 bg-white/5 rounded" />
                                </div>
                            </td>

                            {/* English title */}
                            <td className="p-6">
                                <div className="h-5 w-28 bg-white/5 rounded-md" />
                            </td>

                            {/* Type pill */}
                            <td className="p-6 text-center">
                                <div className="h-6 w-20 bg-white/10 rounded-xl mx-auto" />
                            </td>

                            {/* Actions */}
                            <td className="p-6">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="h-9 w-9 bg-white/5 rounded-xl" />
                                    <div className="h-9 w-9 bg-white/5 rounded-xl" />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
