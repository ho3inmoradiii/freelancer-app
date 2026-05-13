import { useState } from "react";
import { AsyncBoundary } from "@/components/shared/AsyncBoundary";
import { UsersListSkeleton } from "@/features/user/components/skeletons/UsersListSkeleton";
import { UsersList } from "@/features/user/components/UsersList";
import { type UserStatusType } from "@/features/user/constants/user-statuses";
import { useChangeUserStatus } from "@/features/user/api/useChangeUserStatus";
import { ChangeUserStatusDialog } from "@/features/user/components/ChangeUserStatusDialog";

type SelectedUserType = {
    id: string;
    status: UserStatusType;
    name: string;
};

export const UsersPage = () => {
    const [selectedUser, setSelectedUser] = useState<SelectedUserType | null>(null);

    const { mutateAsync: changeStatusAsync, isPending } = useChangeUserStatus(selectedUser?.name);

    const handleSubmitStatus = (newStatus: number) => {
        if (!selectedUser) return Promise.reject();

        return changeStatusAsync({
            userId: selectedUser.id,
            status: newStatus as UserStatusType
        });
    };

    return (
        <section className="container mx-auto space-y-10 animate-in fade-in duration-1000">
            <h1 className="text-2xl font-bold text-brand-text pb-10">
                کاربران
            </h1>

            <div className="w-full overflow-hidden animate-in fade-in slide-in-from-bottom-10 delay-300 duration-1000 fill-mode-both">
                <AsyncBoundary
                    fallback={<UsersListSkeleton />}
                    errorMessage="خطای سیستمی در دریافت اطلاعات کاربران"
                >
                    <UsersList
                        onChangeStatusClick={(userInfo) => setSelectedUser(userInfo)}
                    />
                </AsyncBoundary>
            </div>

            <ChangeUserStatusDialog
                isOpen={!!selectedUser}
                onClose={() => setSelectedUser(null)}
                userId={selectedUser?.id}
                userName={selectedUser?.name || ""}
                currentStatus={selectedUser?.status}
                onSubmitAction={handleSubmitStatus}
                isLoading={isPending}
            />
        </section>
    );
};
