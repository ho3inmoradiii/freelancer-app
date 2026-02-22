import { Radio } from "./RadioButton";
import { cn } from "@/utils/cn.ts";

interface RadioOption {
    label: string;
    value: string | number;
}

interface RadioGroupProps {
    options: RadioOption[];
    name: string;
    value?: string | number;
    onChange?: (value: string) => void;
    label?: string;
    error?: string;
    className?: string;
    orientation?: "horizontal" | "vertical";
}

export const RadioGroup = ({
                               options,
                               name,
                               value,
                               onChange,
                               label,
                               error,
                               className,
                               orientation = "vertical",
                           }: RadioGroupProps) => {
    return (
        <div className={cn("flex flex-col gap-3", className)}>
            {label && (
                <label className="text-xs font-semibold text-brand-text-muted uppercase tracking-wider mr-1">
                    {label}
                </label>
            )}

            <div
                className={cn(
                    "flex gap-6 p-1",
                    orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"
                )}
            >
                {options.map((option) => (
                    <Radio
                        key={option.value}
                        name={name}
                        label={option.label}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange?.(e.target.value)}
                        error={undefined}
                    />
                ))}
            </div>

            {error && (
                <p className="text-xs text-red-400 mt-1 animate-in fade-in slide-in-from-top-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-500" /> {error}
                </p>
            )}
        </div>
    );
};
