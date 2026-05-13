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

    const errorMessage =
        error instanceof Error ? error.message : "خطای بحرانی";

    return <ErrorUI errorMessage={errorMessage} onReset={handleReset} />;
};
