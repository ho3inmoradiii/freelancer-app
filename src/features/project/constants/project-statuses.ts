export const PROJECT_STATUSES = {
    ALL: "ALL",
    OPEN: "OPEN",
    CLOSED: "CLOSED",
} as const;

export type ProjectStatus = keyof typeof PROJECT_STATUSES;
