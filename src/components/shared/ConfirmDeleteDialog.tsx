import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    entityName: string;
    entityType?: string;
    isPending: boolean;
}

export const ConfirmDeleteDialog = ({
                                        isOpen,
                                        onClose,
                                        onConfirm,
                                        entityName,
                                        entityType = "آیتم",
                                        isPending,
                                    }: ConfirmDeleteDialogProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="bg-brand-surface border-brand-border rounded-[2rem]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white text-right">
                        آیا از حذف {entityType} «{entityName}» اطمینان دارید؟
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-brand-text-muted text-right">
                        این عملیات غیرقابل بازگشت است و تمام داده‌های مرتبط با این {entityType} حذف خواهند شد.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row-reverse gap-3">
                    <Button
                        onClick={onConfirm}
                        disabled={isPending}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-xl flex-1 h-12"
                    >
                        بله، حذف شود
                    </Button>

                    <Button
                        onClick={onClose}
                        variant="outline"
                        disabled={isPending}
                        className="bg-white/5 border-brand-border text-brand-text-muted hover:bg-white/10 hover:text-white rounded-xl flex-1 h-12"
                    >
                        انصراف
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
