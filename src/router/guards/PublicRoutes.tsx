import { useUser } from "@/features/user/api/useUser";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
    const { data: user } = useUser();

    const role = user?.role.toLowerCase();

    if (user) {
        return <Navigate to={user.isActive ? `/${role}` : "/complete-profile"} replace />;
    }

    return <Outlet />;
};
