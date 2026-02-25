export const authKeys = {
    all: ['auth'] as const,
    user: () => [...authKeys.all, 'user'] as const,
};

export const userKeys = {
    all: ['user'] as const,
    profile: () => [...userKeys.all, 'profile'] as const,
}

export const categoryKeys = {
    all: ['category'] as const,
}

export const queryKeys = {
    auth: authKeys,
    user: userKeys,
    category: categoryKeys,
} as const;
