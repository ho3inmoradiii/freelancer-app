import { Outlet, useOutletContext } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { type User } from "@/features/user/schemas/user.schema";

export const MainLayout = () => {
    const user = useOutletContext<User>();

    return (
        <div className="min-h-screen bg-brand-bg flex flex-col">
            <Header user={user} />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar user={user} />

                <main className="flex-1 min-w-0 p-4 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet context={user}/>
                    </div>
                </main>
            </div>
        </div>
    );
};
