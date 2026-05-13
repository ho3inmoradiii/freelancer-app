import { useUsersList } from "@/features/user/api/useUsersList";
import { Database, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { USER_STATUS_CONFIG, type UserStatusType } from "@/features/user/constants/user-statuses";

type UsersListContentProps = {
    onChangeStatusClick?: (userInfo: { id: string; status: UserStatusType; name: string }) => void;
}

export const UsersList = ({ onChangeStatusClick }: UsersListContentProps) => {
    const { data: response } = useUsersList();

    const users = response?.data?.users || [];

    return (
        <div className="w-full min-w-0 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-brand-primary"/>
                    <h3 className="text-xl font-bold text-white">لیست کاربران</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-brand-border">
                    <Database className="w-3.5 h-3.5 text-brand-text-muted"/>
                    <span className="text-xs font-mono text-brand-text-muted">{users.length} کاربر</span>
                </div>
            </div>

            {/* Table Card */}
            <div className="w-full overflow-hidden bg-brand-surface/10 border border-brand-border rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative">
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 blur-[100px] -z-10"/>

                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[1000px] text-right border-collapse whitespace-nowrap">
                        <thead>
                        <tr className="border-b border-brand-border/50 bg-white/[0.02] text-brand-text-muted text-xs uppercase tracking-widest">
                            <th className="p-6 font-black text-center">#</th>
                            <th className="p-6 font-black">نام</th>
                            <th className="p-6 font-black">ایمیل</th>
                            <th className="p-6 font-black">شماره موبایل</th>
                            <th className="p-6 font-black">نقش</th>
                            <th className="p-6 font-black text-center">وضعیت</th>
                            <th className="p-6 font-black text-center">عملیات</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border/30">
                        {users.map((user, index) => {
                            const userStatus = user.status as UserStatusType;
                            const statusConfig = USER_STATUS_CONFIG[userStatus] || {
                                label: 'نامشخص',
                                className: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                            };

                            return (
                                <tr key={user._id}
                                    className="hover:bg-brand-primary/[0.02] transition-all duration-300 group">

                                    <td className="p-6 text-center text-brand-text-muted">{index + 1}</td>

                                    <td className="p-6 text-white font-bold">{user.name}</td>

                                    <td className="p-6 text-brand-text-muted font-mono text-sm">
                                        {user.email || '---'}
                                    </td>

                                    <td className="p-6 text-brand-text-muted font-mono text-sm">
                                        {user.phoneNumber}
                                    </td>

                                    <td className="p-6 text-brand-text-muted font-medium">
                                        {user.role}
                                    </td>

                                    <td className="p-6 text-center">
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-medium",
                                            statusConfig.className
                                        )}>
                                            {statusConfig.label}
                                        </span>
                                    </td>

                                    <td className="p-6 text-center">
                                        <button
                                            onClick={() => onChangeStatusClick?.({
                                                id: user._id,
                                                status: user.status,
                                                name: user.name,
                                            })}
                                            className="px-4 py-2 text-xs font-bold text-white transition-colors bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/20 rounded-lg cursor-pointer"
                                        >
                                            تغییر وضعیت
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {users.length === 0 && (
                    <div className="p-32 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="p-6 bg-white/5 rounded-full text-brand-text-muted/20">
                            <Users className="w-12 h-12"/>
                        </div>
                        <p className="text-brand-text-muted font-medium">هیچ کاربری یافت نشد.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
