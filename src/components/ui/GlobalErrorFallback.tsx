import { type FallbackProps } from "react-error-boundary";
import { ErrorUI } from "./ErrorUI";

export const GlobalErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    const handleReset = () => {
        if (resetErrorBoundary) {
            resetErrorBoundary();
        } else {
            window.location.reload();
        }
    };

    return <ErrorUI errorMessage={error?.message || "خطای بحرانی"} onReset={handleReset} />;
};
