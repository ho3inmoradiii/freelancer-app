import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { ProtectedRoutes } from "@/router/guards/ProtectedRoutes.tsx";
import { PublicRoutes } from "@/router/guards/PublicRoutes.tsx";
import { AuthPage } from '@/pages/AuthPage.tsx';
import { CompleteProfile } from "@/pages/CompleteProfile.tsx";
import { NotFoundPage } from "@/pages/NotFoundPage.tsx";
import { HomePage } from "@/pages/HomePage.tsx";
import { RouterErrorElement } from "@/components/ui/RouterErrorElement.tsx";
import { MainLayout } from "@/layouts/MainLayout.tsx";
import { CreateCategory } from "@/pages/CreateCategory.tsx";

const routes: RouteObject[] = [
    {
        path: '/',
        errorElement: <RouterErrorElement />,
        children: [
            {
                index: true,
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
                        element: <MainLayout />,
                        children: [
                            {
                                path: '/dashboard',
                                element: <div>داشبورد مدیریت پرونده‌ها</div>,
                            },
                            {
                                path: '/admin',
                                children: [
                                    {
                                        path: 'category',
                                        element: <CreateCategory />
                                    }
                                ]
                            },
                        ],
                    },
                    {
                        path: '/complete-profile',
                        element: <CompleteProfile />,
                    },
                ],
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
];

export const router = createBrowserRouter(routes);
