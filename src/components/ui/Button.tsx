import { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
    "relative w-full pt-[14px] pb-[10px] px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                primary: "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary-hover hover:shadow-brand-primary/40",
                secondary: "bg-transparent border border-brand-border text-brand-text-muted hover:text-white hover:bg-white/5 hover:border-brand-text-muted/30",
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
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

            {isLoading ? (
                <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>در حال پردازش...</span>
                </div>
            ) : (
                <span className="relative z-10 flex items-center gap-2">{children}</span>
            )}
        </button>
    );
};
