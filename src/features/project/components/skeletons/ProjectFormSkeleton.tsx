const FieldSkeleton = () => (
    <div className="space-y-3">
        {/* Label Skeleton */}
        <div className="h-5 w-24 bg-white/10 rounded-md animate-pulse" />
        {/* Input Skeleton */}
        <div className="h-[3.25rem] w-full bg-white/5 rounded-2xl animate-pulse" />
    </div>
);

export const ProjectFormSkeleton = () => {
    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* Header Skeleton */}
            <div className="flex items-center gap-4 mb-10 border-r-4 border-white/10 pr-6">
                <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse" />
            </div>

            {/* Form Container Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-brand-surface/20 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] relative shadow-2xl">

                {/* Background glow skeleton */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

                {/* Column 1 */}
                <div className="space-y-10 relative z-10">
                    <FieldSkeleton /> {/* Title */}
                    <FieldSkeleton /> {/* Category */}
                    <FieldSkeleton /> {/* Budget */}
                </div>

                {/* Column 2 */}
                <div className="space-y-10 relative z-10">
                    <FieldSkeleton /> {/* Description */}
                    <FieldSkeleton /> {/* Tags */}
                    <FieldSkeleton /> {/* Deadline */}
                </div>

                {/* Submit Button Skeleton */}
                <div className="md:col-span-2 mt-4">
                    <div className="w-full h-14 bg-white/10 rounded-xl animate-pulse" />
                </div>
            </div>
        </div>
    );
};
