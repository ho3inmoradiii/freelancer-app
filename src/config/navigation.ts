import {
    LayoutDashboard,
    Briefcase,
    Users,
    LayoutGrid,
    Layers,
    FileText
} from "lucide-react";
import { type Role } from "@/features/user/schemas/user.schema";
import { type SidebarItem } from "@/types/sidebar";

export const SIDEBAR_CONFIG: Record<Role, SidebarItem[]> = {
    ADMIN: [
        { href: "/admin/dashboard", title: "پنل مدیریت", icon: LayoutDashboard },
        { href: "/admin/category", title: "دسته‌بندی", icon: LayoutGrid },
        { href: "/admin/users", title: "مدیریت کاربران", icon: Users },
        { href: "/admin/projects", title: "همه پروژه‌ها", icon: Briefcase },
        { href: "/admin/proposals", title: "درخواست‌ها", icon: FileText },
    ],
    OWNER: [
        { href: "/owner/dashboard", title: "داشبورد کارفرما", icon: LayoutDashboard },
        { href: "/owner/projects", title: "پروژه‌ها", icon: Layers },
    ],
    FREELANCER: [
        { href: "/freelancer/dashboard", title: "میز کار", icon: LayoutDashboard },
        { href: "/freelancer/projects", title: "پروژه‌ها", icon: Layers },
        { href: "/freelancer/proposals", title: "درخواست‌ها", icon: FileText },
    ],
};
