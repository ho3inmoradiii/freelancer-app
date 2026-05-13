import { apiClient } from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SuccessMessageResponseSchema, type SuccessMessageResponse } from "@/lib/schemas/api.schemas";
import { queryKeys } from "@/config/query-keys";
import { isAxiosError } from "axios";
import { produce } from "immer";
import { type ProposalStatusType } from "@/features/proposal/constants/proposal-statuses";

type ChangeProposalStatusVariables = {
    proposalId: string;
    projectId: string;
    status: ProposalStatusType;
}

type ProjectCacheShape = {
    data: {
        project: {
            proposals: Array<{
                _id: string;
                status: ProposalStatusType;
            }>;
        };
    };
}

export const changeProposalStatus = async ({ proposalId, projectId, status }: ChangeProposalStatusVariables): Promise<SuccessMessageResponse> => {
    const response = await apiClient.patch(`/proposal/${proposalId}`, {
        projectId,
        status: String(status)
    });

    const result = SuccessMessageResponseSchema.safeParse(response);

    if (!result.success) {
        console.error('[تغییر وضعیت درخواست]: عدم تطابق ساختار پاسخ:', result.error.format());
        throw new Error('دیتای دریافتی با قرارداد Schema مطابقت ندارد!');
    }

    return result.data;
}

export const useChangeProposalStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: changeProposalStatus,

        onMutate: async ({ proposalId, projectId, status }) => {
            const queryKey = queryKeys.project.detail(projectId);

            await queryClient.cancelQueries({ queryKey });

            const previousProjectData = queryClient.getQueryData<ProjectCacheShape>(queryKey);

            queryClient.setQueryData<ProjectCacheShape>(queryKey, (oldData) => {
                if (!oldData) return oldData;

                return produce(oldData, (draft) => {
                    const proposal = draft.data.project.proposals.find(p => p._id === proposalId);

                    if (proposal) {
                        proposal.status = status;
                    }
                });
            });

            return { previousProjectData, queryKey };
        },

        onError: (error, variables, context) => {
            if (context?.previousProjectData) {
                queryClient.setQueryData(context.queryKey, context.previousProjectData);
            }

            if (isAxiosError(error)) {
                console.error(`[خطای تغییر وضعیت درخواست]: ${error.response?.data?.message || error.message}`);
            } else {
                console.error(`[خطای غیرمنتظره]: ${error.message}`);
            }
        },

        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.project.detail(variables.projectId)
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.project.ownerList()
            });
        }
    });
};
