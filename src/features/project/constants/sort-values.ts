export const SORT_VALUES = {
    LATEST: "latest",
    EARLIEST: "earliest",
} as const;

export type SortValue = typeof SORT_VALUES[keyof typeof SORT_VALUES];
