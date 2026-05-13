import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { ProjectList } from "@/features/project/components/ProjectList";
import { AsyncBoundary } from "@/components/shared/AsyncBoundary";
import { ProjectListSkeleton } from "@/features/project/components/skeletons/ProjectListSkeleton";

export const OwnerProjects = () => {
    return (
        <section className="container mx-auto space-y-10 animate-in fade-in duration-1000">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-brand-border/30 pb-10">
                <div>
                    <h1 className="text-2xl font-bold text-brand-text mb-2">مدیریت پروژه‌ها</h1>
                    <p className="text-sm text-brand-text/60">
                        در این بخش می‌توانید پروژه‌های خود را مشاهده و مدیریت کنید.
                    </p>
                </div>

                <Link
                    to="/owner/projects/create"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-brand-surface rounded-2xl transition-all duration-300 hover:bg-brand-primary/90 hover:-translate-y-0.5 shadow-lg shadow-brand-primary/20 group whitespace-nowrap"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="font-medium">اضافه کردن پروژه جدید</span>
                </Link>
            </div>

            {/* List Section with AsyncBoundary */}
            <div className="w-full overflow-hidden animate-in fade-in slide-in-from-bottom-10 delay-300 duration-1000 fill-mode-both">
                <AsyncBoundary
                    fallback={<ProjectListSkeleton />}
                    errorMessage="خطای سیستمی در دریافت لیست پروژه‌ها"
                >
                    <ProjectList />
                </AsyncBoundary>
            </div>
        </section>
    );
};
