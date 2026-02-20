import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { AuthPage } from '@/pages/AuthPage.tsx';

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
