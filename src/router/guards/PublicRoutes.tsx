import { useUser } from "@/features/user/api/useUser.ts";
import { Navigate, Outlet } from "react-router-dom";
import { FullPageLoader } from "@/components/ui/FullPageLoader.tsx";

export const PublicRoutes = () => {
    const { data: user, isPending, isSuccess } = useUser();

    if (isPending) return <FullPageLoader />;

    if (isSuccess && user) {
        return <Navigate to={user.isActive ? "/dashboard" : "/complete-profile"} replace />;
    }

    return <Outlet />;
};
