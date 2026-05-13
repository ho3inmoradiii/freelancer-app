import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FORM_STYLES } from "@/features/project/components/CreateProjectForm.styles";

export type SelectOption = {
    value: string;
    label: string;
};

type CustomSelectProps = {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    error?: string;
    className?: string;
}

export const CustomSelect = ({
                                 value,
                                 onChange,
                                 options,
                                 placeholder = "انتخاب کنید...",
                                 error,
                                 className
                             }: CustomSelectProps) => {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger
                className={cn(
                    FORM_STYLES.input,
                    "flex items-center justify-between",
                    !value ? "text-brand-text-muted" : "text-white",
                    error && "border-red-500/50 focus:border-red-500",
                    className
                )}
                dir="rtl"
            >
                <span className="text-sm font-medium leading-none">
                    <SelectValue placeholder={placeholder} />
                </span>
            </SelectTrigger>

            <SelectContent className="bg-brand-surface border-brand-border text-white rounded-xl" dir="rtl" position="popper">
                {options.map((opt) => (
                    <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="focus:bg-brand-primary/20 focus:text-brand-primary transition-colors rounded-xl"
                    >
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
