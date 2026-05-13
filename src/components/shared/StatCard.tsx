import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
    title: string;
    value: number | string;
    icon: LucideIcon;
    colorClassName?: string;
    iconBgClassName?: string;
};

export const StatCard = ({ title, value, icon: Icon, colorClassName, iconBgClassName }: StatCardProps) => {
    return (
        <div className="relative overflow-hidden bg-brand-surface/10 border border-brand-border rounded-[2rem] p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-brand-surface/20 group">
            <div className="flex items-center justify-between z-10 relative">
                <div className="space-y-3">
                    <p className="text-sm font-medium text-brand-text-muted">
                        {title}
                    </p>
                    <p className="text-3xl font-black text-white">
                        {value}
                    </p>
                </div>

                <div className={cn(
                    "p-4 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
                    iconBgClassName || "bg-brand-primary/10"
                )}>
                    <Icon className={cn("w-7 h-7", colorClassName || "text-brand-primary")} />
                </div>
            </div>

            <div className={cn(
                "absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-20 -z-10 rounded-full",
                colorClassName ? colorClassName.replace('text-', 'bg-') : "bg-brand-primary"
            )} />
        </div>
    );
};
