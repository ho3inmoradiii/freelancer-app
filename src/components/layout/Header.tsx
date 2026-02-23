import { UserCircle, LogOut } from "lucide-react";
import { type User } from "@/features/user/schemas/user.schema.ts";

type HeaderProps = {
    user: User;
};

export const Header = ({ user }: HeaderProps) => {
    return (
        <header className="h-16 border-b border-brand-border bg-brand-surface/50 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center font-black text-brand-bg">
                    F
                </div>
                <span className="font-bold text-white hidden sm:block">Freelance Universe</span>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-brand-border">
                    <UserCircle className="w-6 h-6 text-brand-primary" />
                    <span className="text-sm font-medium text-brand-text-muted">{user.name}</span>
                </div>

                <button
                    title="خروج از حساب"
                    className="flex items-center gap-2 text-brand-text-muted hover:text-red-400 transition-colors group"
                >
                    <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider hidden md:block">خروج</span>
                </button>
            </div>
        </header>
    );
};
