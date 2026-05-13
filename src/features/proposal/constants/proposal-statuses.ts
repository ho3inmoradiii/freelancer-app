export const PROPOSAL_STATUS = {
    REJECTED: 0,
    PENDING: 1,
    ACCEPTED: 2,
} as const;

export type ProposalStatusType = typeof PROPOSAL_STATUS[keyof typeof PROPOSAL_STATUS];

export const PROPOSAL_STATUS_CONFIG: Record<ProposalStatusType, { label: string; className: string }> = {
    [PROPOSAL_STATUS.REJECTED]: { label: 'رد شده', className: 'bg-red-500/10 text-red-400 border-red-500/20' },
    [PROPOSAL_STATUS.PENDING]: { label: 'در انتظار تایید', className: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    [PROPOSAL_STATUS.ACCEPTED]: { label: 'تایید شده', className: 'bg-green-500/10 text-green-400 border-green-500/20' },
};
