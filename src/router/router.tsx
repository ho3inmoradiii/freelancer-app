import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { ProtectedRoutes } from "@/router/guards/ProtectedRoutes.tsx";
import { PublicRoutes } from "@/router/guards/PublicRoutes.tsx";
import { AuthPage } from '@/pages/AuthPage.tsx';
import { CompleteProfile } from "@/pages/CompleteProfile.tsx";

const routes: RouteObject[] = [
    {
        element: <PublicRoutes />,
        children: [
            {
                path: '/',
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
];

export const router = createBrowserRouter(routes);
