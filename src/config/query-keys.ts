export const authKeys = {
    all: ['auth'] as const,
    user: () => [...authKeys.all, 'user'] as const,
};

export const userKeys = {
    all: ['user'] as const,
    profile: () => [...userKeys.all, 'profile'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
}

export const categoryKeys = {
    all: ['category'] as const,
    lists: () => [...categoryKeys.all, 'list'] as const,
    detail: (id: string) => [...categoryKeys.all, 'detail', id] as const,
}

export const projectKeys = {
    all: ['project'] as const,
    lists: () => [...projectKeys.all, 'list'] as const,
    freelancerList: () => [...projectKeys.lists(), 'freelancer'] as const,
    ownerList: () => [...projectKeys.lists(), 'owner'] as const,
    detail: (id: string) => [...projectKeys.all, 'detail', id] as const,
}

export const proposalKeys = {
    all: ['proposal'] as const,
    lists: () => [...proposalKeys.all, 'list'] as const,
}


export const queryKeys = {
    auth: authKeys,
    user: userKeys,
    category: categoryKeys,
    project: projectKeys,
    proposal: proposalKeys,
} as const;
