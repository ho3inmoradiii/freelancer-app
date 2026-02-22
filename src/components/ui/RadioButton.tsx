import { forwardRef, InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const radioVariants = cva(
    "w-5 h-5 cursor-pointer appearance-none rounded-full border-2 transition-all duration-300 outline-none bg-brand-surface relative peer",
    {
        variants: {
            hasError: {
                true: "border-red-500/50 focus:ring-4 focus:ring-red-500/10",
                false: "border-brand-border hover:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 checked:border-brand-primary",
            },
        },
        defaultVariants: {
            hasError: false,
        },
    }
);

interface RadioProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
        VariantProps<typeof radioVariants> {
    label?: string;
    error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1 w-fit group">
                <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative flex items-center justify-center">
                        <input
                            type="radio"
                            ref={ref}
                            className={cn(radioVariants({hasError: !!error}), className)}
                            {...props}
                        />
                        <div
                            className="absolute w-2.5 h-2.5 bg-brand-primary rounded-full scale-0 transition-transform duration-300 peer-checked:scale-100 pointer-events-none"/>
                    </div>
                    {label && (
                        <span
                            className="text-sm font-medium text-brand-text-muted group-hover:text-brand-text-main transition-colors">
                            {label}
                        </span>
                    )}
                </label>
                {error && (
                    <p className="text-[10px] text-red-400 mt-1 animate-in fade-in slide-in-from-right-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
