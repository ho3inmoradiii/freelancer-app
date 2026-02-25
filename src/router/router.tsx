import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { ProtectedRoutes } from "@/router/guards/ProtectedRoutes";
import { PublicRoutes } from "@/router/guards/PublicRoutes";
import { AuthPage } from '@/pages/AuthPage';
import { CompleteProfile } from "@/pages/CompleteProfile";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { HomePage } from "@/pages/HomePage";
import { RouterErrorElement } from "@/components/ui/RouterErrorElement";
import { MainLayout } from "@/layouts/MainLayout";
import { CreateCategory } from "@/pages/CreateCategory";
import { RoleGuard } from "@/router/guards/RoleGuard";
import { EditCategory } from "@/pages/EditCategory";
import { Navigate } from "react-router-dom";

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
                                element: <RoleGuard allowedRoles={['ADMIN']} />,
                                path: '/admin',
                                children: [
                                    { index: true, element: <Navigate to="category" replace /> },
                                    { path: 'category', element: <CreateCategory /> },
                                    { path: 'category/edit/:categoryId', element: <EditCategory /> }
                                ],
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
