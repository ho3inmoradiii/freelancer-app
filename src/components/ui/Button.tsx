import { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
    "w-full py-2 px-4 rounded-md transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center",
    {
        variants: {
            variant: {
                primary: "bg-blue-600 text-white hover:bg-blue-700",
                secondary: "text-sm text-gray-400 hover:text-white bg-transparent border border-transparent hover:border-gray-700",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    children: ReactNode;
}

export const Button = ({ isLoading, variant, className, children, ...props }: ButtonProps) => {
    return (
        <button
            className={cn(buttonVariants({ variant }), className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    در حال پردازش...
                </span>
            ) : children}
        </button>
    );
};
