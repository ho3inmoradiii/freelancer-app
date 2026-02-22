import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { ProtectedRoutes } from "@/router/guards/ProtectedRoutes.tsx";
import { PublicRoutes } from "@/router/guards/PublicRoutes.tsx";
import { AuthPage } from '@/pages/AuthPage.tsx';
import { CompleteProfile } from "@/pages/CompleteProfile.tsx";
import { NotFoundPage } from "@/pages/NotFoundPage.tsx";
import { HomePage } from "@/pages/HomePage.tsx";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        element: <PublicRoutes />,
        children: [
            {
                path: '/auth',
                element: <AuthPage />,
            },
        ]
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: '/complete-profile',
                element: <CompleteProfile />,
            },
            {
                path: '/dashboard',
                element: <div>داشبورد مدیریت پرونده‌ها</div>,
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
];

export const router = createBrowserRouter(routes);
