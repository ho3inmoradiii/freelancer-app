import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { queryClient } from '@/config/query-client';
import { RouterProvider } from 'react-router-dom';
import './styles/index.css';
import { router } from "@/router/router";
import { Toaster } from 'sonner';
import { GlobalErrorFallback } from "@/components/ui/GlobalErrorFallback";
import { FullPageLoader } from "@/components/ui/FullPageLoader";
import '@/lib/zodErrorMap';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary
                        FallbackComponent={GlobalErrorFallback}
                        onReset={reset}
                    >
                        <Suspense fallback={<FullPageLoader />}>
                            <RouterProvider router={router} />
                        </Suspense>

                        <Toaster
                            dir="rtl"
                            richColors
                            position="bottom-center"
                        />
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </QueryClientProvider>
    </StrictMode>,
)
