import { Tag } from "lucide-react";

export const CreateCategoryFormSkeleton = () => {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-10 border-r-4 border-brand-primary pr-6">
                <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
                    <Tag className="w-8 h-8 animate-pulse opacity-70" />
                </div>
                <div className="space-y-2">
                    <div className="h-6 w-48 bg-white/10 rounded-lg animate-pulse" />
                    <div className="h-3 w-32 bg-white/5 rounded-lg animate-pulse" />
                </div>
            </div>

            {/* Form Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-brand-surface/40 backdrop-blur-xl border border-brand-border p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="space-y-6">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                            <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                        <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
                    </div>

                    <div className="space-y-3">
                        <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
                        <div className="flex gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-24 h-10 bg-white/5 rounded-full animate-pulse"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="md:col-span-2 pt-6 border-t border-brand-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-brand-text-muted text-xs bg-white/5 px-4 py-2 rounded-full">
                        <div className="w-4 h-4 bg-white/5 rounded-full animate-pulse" />
                        <div className="h-3 w-48 bg-white/5 rounded animate-pulse" />
                    </div>

                    <div className="w-full sm:w-64 h-14 bg-brand-primary/20 rounded-2xl animate-pulse shadow-lg shadow-brand-primary/10" />
                </div>
            </div>
        </div>
    );
}
