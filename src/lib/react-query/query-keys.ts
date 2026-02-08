/**
 * Centralized Query Keys Registry
 * All query keys should be defined here for consistency
 */
export const QUERY_KEYS = {
  USER: {
    ROOT: ["users"] as const,
    DETAILS: ["users", "detail"] as const,
    DETAIL: (id: string) => ["users", "detail", id] as const,
  },
  // Add more query key factories as needed
} as const;
