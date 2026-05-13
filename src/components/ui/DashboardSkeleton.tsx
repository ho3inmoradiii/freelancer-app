export const DashboardSkeleton = () => {
    return (
        <div className="w-full min-w-0 space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center gap-3">
                <div className="h-8 w-40 bg-brand-surface/30 rounded-lg"></div>
                <div className="h-5 w-48 bg-brand-surface/20 rounded-lg mt-1"></div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden bg-brand-surface/10 border border-brand-border rounded-[2rem] p-6 shadow-xl h-[120px] flex items-center justify-between"
                    >
                        <div className="space-y-4">
                            {/* Title skeleton */}
                            <div className="h-4 w-24 bg-brand-surface/30 rounded-md"></div>
                            {/* Value skeleton */}
                            <div className="h-8 w-16 bg-brand-surface/40 rounded-md"></div>
                        </div>

                        {/* Icon Box skeleton */}
                        <div className="w-14 h-14 rounded-2xl bg-brand-surface/30"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
