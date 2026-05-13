import { useUser } from "@/features/user/api/useUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoutes = () => {
    const { pathname } = useLocation();
    const { data: user } = useUser();

    const role = user?.role.toLowerCase();

    if (!user) return <Navigate to="/auth" replace />;

    if (!user.isActive && pathname !== '/complete-profile') {
        return <Navigate to="/complete-profile" replace />;
    }

    if (user.isActive && pathname === '/complete-profile') {
        return <Navigate to={`/${role}`} replace />;
    }

    return <Outlet context={ user } />;
};
