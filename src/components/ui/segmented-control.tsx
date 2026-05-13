import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export type SegmentedControlOption = {
    label: string;
    value: string;
};

type SegmentedControlProps = {
    options: SegmentedControlOption[];
    value: string;
    onValueChange: (value: string) => void;
    label?: string;
    className?: string;
}

export function SegmentedControl({
                                     options,
                                     value,
                                     onValueChange,
                                     label,
                                     className,
                                 }: SegmentedControlProps) {
    const handleValueChange = (newValue: string) => {
        if (newValue) {
            onValueChange(newValue);
        }
    };

    return (
        <div className={cn("flex items-center gap-4", className)}>
            {label && (
                <span className="text-sm font-medium text-white">
                    {label}
                </span>
            )}
            <ToggleGroup
                type="single"
                value={value}
                onValueChange={handleValueChange}
                className="h-12 items-center justify-center rounded-xl border border-gray-800 bg-transparent p-1 flex-row-reverse"
            >
                {options.map((option) => (
                    <ToggleGroupItem
                        key={option.value}
                        value={option.value}
                        aria-label={`Toggle ${option.label}`}
                        className="rounded-xl px-3 py-1.5 text-sm font-medium text-slate-400 ring-offset-background transition-all
                                   hover:text-white hover:bg-transparent cursor-pointer
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                                   disabled:pointer-events-none disabled:opacity-50
                                   data-[state=on]:bg-brand-primary
                                   data-[state=on]:text-primary-foreground
                                   data-[state=on]:shadow-none"
                    >
                        {option.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    );
}
