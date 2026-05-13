import { useState } from "react";
import { useCategories } from "@/features/category/api/useCategories";
import { Edit2, Trash2, ListTree, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useDeleteCategory } from "@/features/category/api/useDeleteCategory";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/shared/ConfirmDeleteDialog";

export const CategoryList = () => {
    const navigate = useNavigate();
    const { mutateAsync, isPending } = useDeleteCategory();

    const { data: response } = useCategories();
    const categories = response?.data?.categories || [];
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const editCategory = (categoryId: string) => {
        navigate(`/admin/category/edit/${categoryId}`);
    }

    const deleteCategory = () => {
        if (deleteId) {
            const promise = mutateAsync(deleteId, {
                onSuccess: () => {
                    setDeleteId(null);
                }
            });

            toast.promise(promise, {
                loading: 'در حال حذف دسته‌بندی',
                success: (res) => res?.data?.message || 'با موفقیت حذف شد',
                error: (err) => {
                    return err.response?.data?.message;
                },
            });
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                    <ListTree className="w-5 h-5 text-brand-primary" />
                    <h3 className="text-xl font-bold text-white">لیست دسته‌بندی‌های موجود</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-brand-border">
                    <Database className="w-3.5 h-3.5 text-brand-text-muted" />
                    <span className="text-xs font-mono text-brand-text-muted">{categories.length} دسته‌بندی</span>
                </div>
            </div>

            <div className="overflow-hidden bg-brand-surface/10 border border-brand-border rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative">
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 blur-[100px] -z-10" />

                <table className="w-full text-right border-collapse">
                    <thead>
                    <tr className="border-b border-brand-border/50 bg-white/[0.02] text-brand-text-muted text-xs uppercase tracking-widest">
                        <th className="p-6 font-black">عنوان</th>
                        <th className="p-6 font-black">شناسه سیستمی</th>
                        <th className="p-6 font-black text-center">بخش</th>
                        <th className="p-6 font-black text-center">عملیات</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/30">
                    {categories.map((category) => (
                        <tr key={category._id} className="hover:bg-brand-primary/[0.02] transition-all duration-300 group">
                            <td className="p-6">
                                <div className="flex flex-col">
                                    <span className="text-white font-bold group-hover:text-brand-primary transition-colors">{category.title}</span>
                                    <span className="text-[10px] text-brand-text-muted mt-1 opacity-60">ID: {category._id.slice(-6)}</span>
                                </div>
                            </td>
                            <td className="p-6">
                                    <span className="text-brand-text-muted font-mono text-xs bg-white/5 px-2 py-1 rounded-md">
                                        {category.englishTitle}
                                    </span>
                            </td>
                            <td className="p-6 text-center">
                                    <span className={cn(
                                        "px-4 py-1.5 rounded-xl text-[10px] font-black border transition-all",
                                        category.type === 'project' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                            category.type === 'post' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                                                "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                                    )}>
                                        {category.type.toUpperCase()}
                                    </span>
                            </td>
                            <td className="p-6">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        className="p-2.5 rounded-xl bg-white/5 text-brand-text-muted hover:bg-brand-primary/20 hover:text-brand-primary transition-all group/btn cursor-pointer"
                                        onClick={() => editCategory(category._id)}
                                    >
                                        <Edit2 className="w-4 h-4 group-hover/btn:scale-110" />
                                    </button>
                                    <button
                                        className="p-2.5 rounded-xl bg-white/5 text-brand-text-muted hover:bg-red-500/20 hover:text-red-400 transition-all group/btn cursor-pointer"
                                        onClick={() => setDeleteId(category._id)}
                                        disabled={isPending}
                                    >
                                        <Trash2 className="w-4 h-4 group-hover/btn:scale-110" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {categories.length === 0 && (
                    <div className="p-32 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="p-6 bg-white/5 rounded-full text-brand-text-muted/20">
                            <Database className="w-12 h-12" />
                        </div>
                        <p className="text-brand-text-muted font-medium">پایگاه‌داده خالی است. اولین ورودی را ثبت کنید.</p>
                    </div>
                )}
            </div>

            <ConfirmDeleteDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={deleteCategory}
                entityName={categories.find(c => c._id === deleteId)?.title || ""}
                entityType="دسته‌بندی"
                isPending={isPending}
            />
        </div>
    );
};
