import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { AuthPage } from '@/features/auth/pages/AuthPage';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <AuthPage />,
    },
    {
        path: '/dashboard',
        element: <div>داشبورد مدیریت پرونده‌ها</div>,
    },
];

export const router = createBrowserRouter(routes);
