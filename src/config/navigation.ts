import {
    LayoutDashboard,
    Briefcase,
    Users,
    LayoutGrid
} from "lucide-react";
import { type Role } from "@/features/user/schemas/user.schema.ts";
import { type SidebarItem } from "@/types/sidebar.ts";

export const SIDEBAR_CONFIG: Record<Role, SidebarItem[]> = {
    ADMIN: [
        { href: "/admin/dashboard", title: "پنل مدیریت", icon: LayoutDashboard },
        { href: "/admin/category", title: "دسته بندی", icon: LayoutGrid },
        { href: "/admin/users", title: "مدیریت کاربران", icon: Users },
        { href: "/admin/projects", title: "همه پروژه‌ها", icon: Briefcase },
    ],
    OWNER: [
        { href: "/owner/dashboard", title: "داشبورد کارفرما", icon: LayoutDashboard },
    ],
    FREELANCER: [
        { href: "/freelancer/dashboard", title: "میز کار", icon: LayoutDashboard },
    ],
};
