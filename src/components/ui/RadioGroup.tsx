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
                <span className="text-sm font-semibold text-gray-400 mb-1">
                    {label}
                </span>
            )}

            <div
                className={cn(
                    "flex gap-4",
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
                <p className="text-xs text-red-500 mt-1 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
};
