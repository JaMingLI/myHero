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
  GITHUB: {
    ROOT: ["github"] as const,
    REPOS: (username: string) => ["github", "repos", username] as const,
    ACTIVITY: (username: string) => ["github", "activity", username] as const,
  },
} as const;
