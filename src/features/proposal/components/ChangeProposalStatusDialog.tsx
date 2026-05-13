import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PROPOSAL_STATUS_CONFIG, type ProposalStatusType } from "@/features/proposal/constants/proposal-statuses";
import { cn } from "@/lib/utils";
import { type SuccessMessageResponse } from "@/lib/schemas/api.schemas";

interface ChangeProposalStatusDialogProps {
    isOpen: boolean;
    onClose: () => void;
    proposalId: string | undefined;
    freelancerName: string;
    currentStatus: ProposalStatusType | undefined;
    onSubmitAction: (status: ProposalStatusType) => Promise<SuccessMessageResponse>;
    isLoading: boolean;
    projectId: string;
}

export const ChangeProposalStatusDialog = ({
                                               isOpen,
                                               onClose,
                                               proposalId,
                                               freelancerName,
                                               currentStatus,
                                               onSubmitAction,
                                               isLoading,
                                           }: ChangeProposalStatusDialogProps) => {

    const { handleSubmit, setValue, watch, reset } = useForm<{ status: ProposalStatusType }>();
    const selectedStatus = watch("status");

    useEffect(() => {
        if (isOpen && currentStatus !== undefined) {
            setValue("status", currentStatus);
        } else if (!isOpen) {
            reset();
        }
    }, [isOpen, currentStatus, setValue, reset]);

    const handleOpenChange = (open: boolean) => {
        if (!open) onClose();
    };

    const onSubmit = (data: { status: ProposalStatusType }) => {
        if (!proposalId) return;

        const promise = onSubmitAction(data.status);

        reset();
        onClose();

        toast.promise(promise, {
            success: "وضعیت درخواست با موفقیت تغییر کرد",
            error: (err) => err.response?.data?.message || err.message || "خطایی رخ داد",
        });
    };

    const availableStatuses = Object.entries(PROPOSAL_STATUS_CONFIG).map(
        ([key, config]) => [Number(key) as ProposalStatusType, config] as const
    );

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="bg-[#1a1a2e] border border-brand-border text-white sm:max-w-[425px]" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-xl text-brand-primary font-bold text-right">تغییر وضعیت درخواست</DialogTitle>
                    <DialogDescription className="text-brand-text-muted mt-2 text-right">
                        انتخاب وضعیت جدید برای درخواست <span className="text-white font-bold">{freelancerName}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-4">
                    <div className="grid grid-cols-1 gap-3">
                        {availableStatuses.map(([key, config]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setValue("status", key)}
                                className={cn(
                                    "flex items-center justify-between px-4 py-4 rounded-xl border transition-all duration-200 cursor-pointer",
                                    selectedStatus === key
                                        ? "border-brand-primary bg-brand-primary/10"
                                        : "border-brand-border/50 bg-white/5 hover:bg-white/10"
                                )}
                            >
                                <span className={cn(
                                    "text-sm font-bold",
                                    selectedStatus === key ? "text-brand-primary" : "text-brand-text-muted"
                                )}>
                                    {config.label}
                                </span>
                                <div className={cn(
                                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                                    selectedStatus === key ? "border-brand-primary" : "border-brand-text-muted/50"
                                )}>
                                    {selectedStatus === key && <div className="w-2 h-2 rounded-full bg-brand-primary" />}
                                </div>
                            </button>
                        ))}
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || selectedStatus === currentStatus}
                        className="mt-2 w-full h-14 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "در حال ثبت..." : "ذخیره تغییرات"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
