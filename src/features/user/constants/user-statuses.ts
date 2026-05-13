export const USER_STATUS = {
    REJECTED: 0,
    PENDING: 1,
    ACCEPTED: 2,
} as const;

export type UserStatusType = typeof USER_STATUS[keyof typeof USER_STATUS];

export const USER_STATUS_CONFIG: Record<UserStatusType, { label: string; className: string }> = {
    [USER_STATUS.REJECTED]: { label: 'رد شده', className: 'bg-red-500/10 text-red-400 border-red-500/20' },
    [USER_STATUS.PENDING]: { label: 'در انتظار تایید', className: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    [USER_STATUS.ACCEPTED]: { label: 'تایید شده', className: 'bg-green-500/10 text-green-400 border-green-500/20' },
};
