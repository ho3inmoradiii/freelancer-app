import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/TextField";
import { TextAreaField } from "@/components/ui/TextAreaField";
import { type SuccessMessageResponse } from "@/lib/schemas/api.schemas";
import { type ProposalForm, ProposalFormSchema } from "@/features/proposal/schemas/proposal.schema";

interface CreateProposalDialogProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string | undefined;
    projectTitle: string;
    onSubmitAction: (projectId: string, data: ProposalForm) => Promise<SuccessMessageResponse>;
    isLoading: boolean;
}

export const CreateProposalDialog = ({
                                         isOpen,
                                         onClose,
                                         projectId,
                                         projectTitle,
                                         onSubmitAction,
                                         isLoading
                                     }: CreateProposalDialogProps) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ProposalForm>({
        resolver: zodResolver(ProposalFormSchema),
        defaultValues: {
            price: undefined,
            duration: undefined,
            description: "",
        }
    });

    useEffect(() => {
        if (!isOpen) reset();
    }, [isOpen, reset]);

    const handleOpenChange = (open: boolean) => {
        if (!open) onClose();
    };

    const onSubmit = (data: ProposalForm) => {
        if (!projectId) return;

        const promise = onSubmitAction(projectId, data).then(() => {
            reset();
            onClose();
        });

        toast.promise(promise, {
            loading: "در حال ثبت پیشنهاد...",
            success: "پیشنهاد شما با موفقیت ثبت شد",
            error: (err) => err.response?.data?.message || err.message || "خطایی در ثبت پیشنهاد رخ داد",
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="bg-[#1a1a2e] border border-brand-border text-white sm:max-w-[425px]" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-xl text-brand-primary font-bold text-right">ثبت پیشنهاد همکاری</DialogTitle>
                    <DialogDescription className="text-brand-text-muted mt-2 text-right">
                        درخواست خود را برای پروژه <span className="text-white font-bold">{projectTitle}</span> ثبت کنید.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 mt-4">
                    <TextField
                        {...register("price")}
                        label="قیمت پیشنهادی (تومان)"
                        id="price"
                        placeholder="مثلا: 5000000"
                        error={errors.price?.message}
                    />

                    <TextField
                        {...register("duration")}
                        label="مدت زمان انجام (روز)"
                        id="duration"
                        type="number"
                        placeholder="مثلا: 14"
                        error={errors.duration?.message}
                    />

                    <TextAreaField
                        label="توضیحات تکمیلی"
                        id="description"
                        rows={4}
                        placeholder="چرا شما بهترین گزینه برای این پروژه هستید؟"
                        error={errors.description?.message}
                        {...register("description")}
                    />

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="mt-2 w-full h-14 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/20 cursor-pointer"
                    >
                        {isLoading ? "در حال ارسال..." : "ارسال پیشنهاد"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
