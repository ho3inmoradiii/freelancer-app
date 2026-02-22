import { isRouteErrorResponse, useRouteError, useNavigate } from "react-router-dom";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorUI } from "./ErrorUI";

function getErrorMessage(error: unknown): string {
    if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`;
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "خطای ناشناخته در لایه‌ی سیستم";
}

export const RouterErrorElement = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    const { reset } = useQueryErrorResetBoundary();

    const errorMessage = getErrorMessage(error);

    const handleReset = () => {
        reset();
        navigate(0);
    };

    return <ErrorUI errorMessage={errorMessage} onReset={handleReset} />;
};
