import { forwardRef, InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const radioVariants = cva(
    "w-5 h-5 cursor-pointer appearance-none rounded-full border-2 transition-all outline-none focus:ring-2 focus:ring-blue-500/50 bg-gray-900 checked:bg-blue-500 checked:border-blue-500",
    {
        variants: {
            hasError: {
                true: "border-red-500 focus:ring-red-500/30",
                false: "border-gray-700 hover:border-blue-400",
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
            <div className="flex flex-col gap-1 w-fit">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                        type="radio"
                        ref={ref}
                        className={cn(radioVariants({ hasError: !!error }), className)}
                        {...props}
                    />
                    {label && (
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            {label}
                        </span>
                    )}
                </label>
                {error && (
                    <p className="text-[10px] text-red-500 mt-0.5 animate-in fade-in slide-in-from-left-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
