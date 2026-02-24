import { type Role } from "@/features/user/schemas/user.schema.ts";
import { useUser } from "@/features/user/api/useUser.ts";
import { Outlet } from "react-router-dom";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage.tsx";

type RoleGuardProps = {
    allowedRoles: Role[]
}

export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
    const { data: user } = useUser();

    if (!allowedRoles.includes(user!.role)) {
        return <UnauthorizedPage />;
    }

    return <Outlet />
}
