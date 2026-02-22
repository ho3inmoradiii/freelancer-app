import { forwardRef, InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const inputVariants = cva(
    "w-full px-4 pt-[14px] pb-[10px] leading-none bg-brand-surface/50 border rounded-xl text-white placeholder:text-brand-text-muted outline-none transition-all duration-300",
    {
        variants: {
            hasError: {
                true: "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10",
                false: "border-brand-border focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10",
            },
        },
        defaultVariants: {
            hasError: false,
        },
    }
);

interface TextFieldProps
    extends InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    label?: string;
    error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2 w-full group">
                {label && (
                    <label
                        className="text-xs font-semibold text-brand-text-muted mr-1 group-focus-within:text-brand-primary transition-colors uppercase text-right"
                        htmlFor={props.id}
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(inputVariants({ hasError: !!error }), className)}
                    {...props}
                />
                {error && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                        <span className="w-1 h-1 rounded-full bg-red-500" /> {error}
                    </p>
                )}
            </div>
        );
    }
);
