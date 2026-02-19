import { forwardRef, InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const inputVariants = cva(
    "p-2 border rounded-md transition-all focus:ring-2 focus:ring-blue-500 outline-none w-full bg-gray-900 text-white placeholder:text-gray-500",
    {
        variants: {
            hasError: {
                true: "border-red-500 focus:ring-red-500/50",
                false: "border-gray-700 focus:border-blue-500",
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
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-gray-400" htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(inputVariants({ hasError: !!error }), className)}
                    {...props}
                />
                {error && (
                    <p className="text-xs text-red-500 mt-1 animate-in fade-in slide-in-from-top-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
