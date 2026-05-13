import { apiClient } from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SuccessMessageResponseSchema, type SuccessMessageResponse } from "@/lib/schemas/api.schemas";
import { queryKeys } from "@/config/query-keys";
import { isAxiosError } from "axios";
import { produce } from "immer";
import { type UserStatusType } from "@/features/user/constants/user-statuses";

type ChangeUserStatusVariables = {
    userId: string;
    status: UserStatusType;
}

type UsersListCacheShape = {
    data: {
        users: Array<{
            _id: string;
            status: UserStatusType;
        }>;
    };
}

export const changeUserStatus = async ({ userId, status }: ChangeUserStatusVariables): Promise<SuccessMessageResponse> => {
    const response = await apiClient.patch(`/admin/user/verify/${userId}`, {
        status: String(status)
    });

    const result = SuccessMessageResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[تغییر وضعیت کاربر]: عدم تطابق ساختار پاسخ:', result.error.format());
        throw new Error('دیتای دریافتی با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useChangeUserStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: changeUserStatus,

        onMutate: async ({ userId, status }) => {
            const queryKey = queryKeys.user.lists();

            await queryClient.cancelQueries({ queryKey });

            const previousUsersData = queryClient.getQueryData<UsersListCacheShape>(queryKey);

            queryClient.setQueryData<UsersListCacheShape>(queryKey, (oldData) => {
                if (!oldData) return oldData;

                return produce(oldData, (draft) => {
                    const user = draft.data.users.find(u => u._id === userId);

                    if (user) {
                        user.status = status;
                    }
                });
            });

            return { previousUsersData, queryKey };
        },

        onError: (error, variables, context) => {
            if (context?.previousUsersData) {
                queryClient.setQueryData(context.queryKey, context.previousUsersData);
            }

            if (isAxiosError(error)) {
                console.error(`[خطای تغییر وضعیت کاربر]: ${error.response?.data?.message || error.message}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.user.lists()
            });
        }
    });
};
