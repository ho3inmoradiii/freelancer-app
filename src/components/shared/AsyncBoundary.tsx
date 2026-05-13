import { Suspense, type ReactNode } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { AlertCircle, RefreshCw } from "lucide-react";

interface AsyncBoundaryProps {
    children: ReactNode;
    fallback: ReactNode;
    errorMessage?: string;
}

const ErrorFallback = ({ error, resetErrorBoundary, errorMessage }: FallbackProps & { errorMessage?: string }) => (
    <div className="mx-auto max-w-2xl mt-10 p-6 bg-red-500/5 border border-red-500/20 rounded-3xl flex items-center justify-between text-red-400">
        <div className="flex items-center gap-5">
            <div className="p-3 bg-red-500/10 rounded-2xl">
                <AlertCircle className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-bold text-sm">
                    {errorMessage || "خطای سیستمی در دریافت اطلاعات"}
                </span>
                <p className="text-xs opacity-80">
                    {error instanceof Error ? error.message : "خطای نامشخص"}
                </p>
            </div>
        </div>
        <button
            onClick={resetErrorBoundary}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors"
        >
            <RefreshCw className="w-4 h-4" /> تلاش مجدد
        </button>
    </div>
);

export const AsyncBoundary = ({ children, fallback, errorMessage }: AsyncBoundaryProps) => {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    onReset={reset}
                    fallbackRender={(props) => (
                        <ErrorFallback {...props} errorMessage={errorMessage} />
                    )}
                >
                    <Suspense fallback={fallback}>
                        {children}
                    </Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
};
