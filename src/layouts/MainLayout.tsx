import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header.tsx";
import { Sidebar } from "@/components/layout/Sidebar.tsx";
import { useUser } from "@/features/user/api/useUser.ts";

export const MainLayout = () => {
    const { data: user } = useUser();

    return (
        <div className="min-h-screen bg-brand-bg flex flex-col">
            <Header user={user!} />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar user={user!} />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
