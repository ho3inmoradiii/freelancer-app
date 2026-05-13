import { Suspense } from "react";
import { createBrowserRouter, type RouteObject, Navigate } from 'react-router-dom';
import { ProtectedRoutes } from "@/router/guards/ProtectedRoutes";
import { PublicRoutes } from "@/router/guards/PublicRoutes";
import { RoleGuard } from "@/router/guards/RoleGuard";
import { MainLayout } from "@/layouts/MainLayout";
import { RouterErrorElement } from "@/components/ui/RouterErrorElement";
import { FullPageLoader } from "@/components/ui/FullPageLoader";
import { CreateCategoryFormSkeleton } from "@/features/category/components/skeletons/CreateCategoryFormSkeleton";
import { AsyncBoundary } from "@/components/shared/AsyncBoundary";
import { ProjectFormSkeleton } from "@/features/project/components/skeletons/ProjectFormSkeleton";
import { DashboardSkeleton } from "@/components/ui/DashboardSkeleton";

const routes: RouteObject[] = [
    {
        path: '/',
        errorElement: <RouterErrorElement />,
        children: [
            {
                index: true,
                lazy: async () => ({ Component: (await import("@/pages/HomePage")).HomePage }),
            },
            {
                element: (
                    <Suspense fallback={<FullPageLoader />}>
                        <PublicRoutes />
                    </Suspense>
                ),
                children: [
                    {
                        path: '/auth',
                        lazy: async () => ({ Component: (await import("@/pages/AuthPage")).AuthPage }),
                    },
                ]
            },
            {
                element: (
                    <Suspense fallback={<FullPageLoader />}>
                        <ProtectedRoutes />
                    </Suspense>
                ),
                children: [
                    {
                        element: <MainLayout />,
                        children: [
                            {
                                element: <RoleGuard allowedRoles={['FREELANCER']} />,
                                path: '/freelancer',
                                children: [
                                    { index: true, element: <Navigate to="dashboard" replace /> },
                                    {
                                        path: 'dashboard',
                                        lazy: async () => {
                                            const { FreelancerDashboard } = await import("@/pages/FreelancerDashboard");
                                            return {
                                                Component: () => (
                                                    <AsyncBoundary
                                                        fallback={<DashboardSkeleton />}
                                                        errorMessage="خطای سیستمی در دریافت اطلاعات داشبورد"
                                                    >
                                                        <FreelancerDashboard />
                                                    </AsyncBoundary>
                                                )
                                            };
                                        }
                                    },
                                    {
                                        path: 'projects',
                                        lazy: async () => ({ Component: (await import("@/pages/FreelancerProjects")).FreelancerProjects })
                                    },
                                    {
                                        path: 'proposals',
                                        lazy: async () => ({ Component: (await import("@/pages/ProposalPage")).ProposalPage })
                                    },
                                ]
                            },
                            {
                                element: <RoleGuard allowedRoles={['ADMIN']} />,
                                path: '/admin',
                                children: [
                                    { index: true, element: <Navigate to="dashboard" replace /> },
                                    {
                                        path: 'dashboard',
                                        lazy: async () => {
                                            const { AdminDashboard } = await import("@/pages/AdminDashboard");
                                            return {
                                                Component: () => (
                                                    <AsyncBoundary
                                                        fallback={<DashboardSkeleton />}
                                                        errorMessage="خطای سیستمی در دریافت اطلاعات داشبورد"
                                                    >
                                                        <AdminDashboard />
                                                    </AsyncBoundary>
                                                )
                                            };
                                        }
                                    },
                                    {
                                        path: 'category',
                                        lazy: async () => ({ Component: (await import("@/pages/CreateCategory")).CreateCategory })
                                    },
                                    {
                                        path: 'category/edit/:categoryId',
                                        lazy: async () => {
                                            const { EditCategory } = await import("@/pages/EditCategory");
                                            return {
                                                Component: () => (
                                                    <AsyncBoundary
                                                        fallback={<CreateCategoryFormSkeleton />}
                                                        errorMessage="خطای سیستمی در دریافت دسته‌بندی"
                                                    >
                                                        <EditCategory />
                                                    </AsyncBoundary>
                                                )
                                            };
                                        }
                                    },
                                    {
                                        path: 'projects',
                                        lazy: async () => ({ Component: (await import("@/pages/FreelancerProjects")).FreelancerProjects })
                                    },
                                    {
                                        path: 'proposals',
                                        lazy: async () => ({ Component: (await import("@/pages/ProposalPage")).ProposalPage })
                                    },
                                    {
                                        path: 'users',
                                        lazy: async () => ({ Component: (await import("@/pages/UsersPage")).UsersPage })
                                    },
                                ],
                            },
                            {
                                element: <RoleGuard allowedRoles={['OWNER']} />,
                                path: '/owner',
                                children: [
                                    { index: true, element: <Navigate to="dashboard" replace /> },
                                    {
                                        path: 'dashboard',
                                        lazy: async () => {
                                            const { OwnerDashboard } = await import("@/pages/OwnerDashboard");
                                            return {
                                                Component: () => (
                                                    <AsyncBoundary
                                                        fallback={<DashboardSkeleton />}
                                                        errorMessage="خطای سیستمی در دریافت اطلاعات داشبورد"
                                                    >
                                                        <OwnerDashboard />
                                                    </AsyncBoundary>
                                                )
                                            };
                                        }
                                    },
                                    {
                                        path: 'projects',
                                        lazy: async () => ({ Component: (await import("@/pages/OwnerProjects")).OwnerProjects })
                                    },
                                    {
                                        path: 'projects/create',
                                        lazy: async () => ({ Component: (await import("@/pages/CreateProject")).CreateProject })
                                    },
                                    {
                                        path: 'projects/edit/:projectId',
                                        lazy: async () => {
                                            const { EditProject } = await import("@/pages/EditProject");
                                            return {
                                                Component: () => (
                                                    <AsyncBoundary
                                                        fallback={<ProjectFormSkeleton />}
                                                        errorMessage="خطای سیستمی در دریافت پروژه‌"
                                                    >
                                                        <EditProject />
                                                    </AsyncBoundary>
                                                )
                                            };
                                        }
                                    },
                                    {
                                        path: 'projects/:projectId',
                                        lazy: async () => ({ Component: (await import("@/pages/ProjectProposals")).ProjectProposals })
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: '/complete-profile',
                        lazy: async () => ({ Component: (await import("@/pages/CompleteProfile")).CompleteProfile }),
                    },
                ],
            },
            {
                path: '*',
                lazy: async () => ({ Component: (await import("@/pages/NotFoundPage")).NotFoundPage }),
            }
        ]
    }
];

export const router = createBrowserRouter(routes);
