import { useUser } from "@/features/user/api/useUser.ts";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const ProtectedRoutes = () => {
    const location = useLocation();

    const { data: user, isPending, isError, isSuccess } = useUser();

    if (isPending) return <p>درحال دریافت اطلاعات</p>
    else if (isError) return <Navigate to="/" replace />
    else if (isSuccess) {
        if (!user?.isActive && location.pathname !== '/complete-profile') return <Navigate to="/complete-profile" replace />
        if (user?.isActive && location.pathname === '/complete-profile') return <Navigate to="/dashboard" replace />
        return <Outlet/>
    }
}
