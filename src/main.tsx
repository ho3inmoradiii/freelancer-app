import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { queryClient } from '@/config/query-client';
import { RouterProvider } from 'react-router-dom';
import './styles/index.css';
import { router } from "@/router/router.tsx";
import { Toaster } from 'sonner';
import { GlobalErrorFallback } from "@/components/ui/GlobalErrorFallback.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary
                        FallbackComponent={GlobalErrorFallback}
                        onReset={reset}
                    >
                        <RouterProvider router={router} />
                        <Toaster dir="rtl" richColors position="bottom-center" />
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </QueryClientProvider>
    </StrictMode>,
)
