export const PROJECT_TAGS = ["React", "TypeScript", "UI/UX", "Backend", "OS Development"] as const;

export type ProjectTag = (typeof PROJECT_TAGS)[number];
