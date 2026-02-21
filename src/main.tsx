import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/query-client';
import { RouterProvider } from 'react-router-dom';
import './styles/index.css';
import { router } from "@/router/router.tsx";
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster dir="rtl" richColors position="bottom-center" />
      </QueryClientProvider>
  </StrictMode>,
)
