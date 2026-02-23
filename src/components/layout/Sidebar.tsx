import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_CONFIG } from "@/config/navigation.ts";
import { cn } from "@/utils/cn.ts";
import { type User } from "@/features/user/schemas/user.schema.ts";

type SidebarProps = {
    user: User;
};

export const Sidebar = ({ user }: SidebarProps) => {
    const sidebarItems = SIDEBAR_CONFIG[user.role];
    const { pathname } = useLocation();

    return (
        <aside className="w-64 bg-brand-surface/30 border-l border-brand-border hidden lg:flex flex-col p-6 gap-8">
            <div className="text-[10px] font-black text-brand-text-muted uppercase tracking-[0.3em] px-4">
                Main Menu
            </div>

            <nav className="flex flex-col gap-3">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative",
                                isActive
                                    ? "bg-brand-primary/10 text-brand-primary"
                                    : "text-brand-text-muted hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {isActive && (
                                <div className="absolute right-0 w-1 h-6 bg-brand-primary rounded-l-full shadow-[0_0_15px_rgba(var(--color-brand-primary-rgb),0.5)]" />
                            )}

                            <item.icon className={cn(
                                "w-5 h-5 transition-transform duration-500 group-hover:rotate-[10deg]",
                                isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"
                            )} />

                            <span className="font-semibold text-sm">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};
