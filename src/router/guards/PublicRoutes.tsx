import { useUser } from "@/features/user/api/useUser.ts";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
    const { data: user, isPending, isError, isSuccess } = useUser();

    if (isPending) return <p>درحال دریافت اطلاعات</p>
    else if (isError) return <Outlet/>
    else if (isSuccess) {
        if (!user?.isActive) return <Navigate to="/complete-profile" replace />
        if (user?.isActive) return <Navigate to="/dashboard" replace />
        return null;
    }
}
