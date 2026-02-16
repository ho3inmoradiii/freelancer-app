export const authKeys = {
    all: ['auth'] as const,
    user: () => [...authKeys.all, 'user'] as const,
};

export const queryKeys = {
    auth: authKeys,
} as const;
