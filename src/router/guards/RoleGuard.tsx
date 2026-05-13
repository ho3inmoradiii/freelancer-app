import { Outlet, useOutletContext } from "react-router-dom";
import type { User, Role } from "@/features/user/schemas/user.schema";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage";

type RoleGuardProps = {
    allowedRoles: Role[]
}

export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
    const user = useOutletContext<User>();

    if (!user || !user.role || !allowedRoles.includes(user.role)) {
        return <UnauthorizedPage />;
    }

    return <Outlet />
}
