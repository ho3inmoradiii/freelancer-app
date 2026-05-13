import React, { ReactNode } from "react";
import { FORM_STYLES } from "@/features/project/components/CreateProjectForm.styles";

type FieldWrapperProps = {
    label?: string;
    error?: string;
    children: ReactNode;
    className?: string;
}

export function FieldWrapper({ label, error, children, className = "" }: FieldWrapperProps) {
    return (
        <div className={`flex flex-col w-full group relative gap-2 ${className}`}>
            {label && <label className={FORM_STYLES.label}>{label}</label>}

            {children}

            {error && (
                <p className="absolute -bottom-[22px] right-0 text-[11px] text-red-400 flex items-center gap-1 animate-in fade-in z-10">
                    <span className="w-1 h-1 rounded-full bg-red-500" /> {error}
                </p>
            )}
        </div>
    );
}
