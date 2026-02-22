import { useUser } from "@/features/user/api/useUser.ts";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FullPageLoader } from "@/components/ui/FullPageLoader.tsx";

export const ProtectedRoutes = () => {
    const { pathname } = useLocation();
    const { data: user, isPending, isError } = useUser();

    if (isPending) return <FullPageLoader />;

    if (isError || !user) return <Navigate to="/auth" replace />;

    if (!user.isActive && pathname !== '/complete-profile') {
        return <Navigate to="/complete-profile" replace />;
    }

    if (user.isActive && pathname === '/complete-profile') {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};
