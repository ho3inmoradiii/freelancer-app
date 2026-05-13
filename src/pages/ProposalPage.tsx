import { ProposalList } from "@/features/proposal/components/ProposalList";
import { ProposalListSkeleton } from "@/features/proposal/components/skeletons/ProposalListSkeleton";
import { AsyncBoundary } from "@/components/shared/AsyncBoundary";

export const ProposalPage = () => {
    return (
        <section className="container mx-auto space-y-20 animate-in fade-in duration-1000">
            <div className="w-full overflow-hidden animate-in fade-in slide-in-from-bottom-10 delay-300 duration-1000 fill-mode-both">
                <AsyncBoundary
                    fallback={<ProposalListSkeleton />}
                    errorMessage="خطای سیستمی در دریافت لیست درخواست‌ها"
                >
                    <ProposalList />
                </AsyncBoundary>
            </div>
        </section>
    );
};
