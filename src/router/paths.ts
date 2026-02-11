/**
 * Path Constants
 * Centralized route paths for type-safe navigation
 */
export const PATHS = {
  HOME: "/",
  PROJECTS: "/projects",
  SKILLS: "/skills",
  ACTIVITY: "/activity",
  CONTACT: "/contact",
  NOT_FOUND: "*",
} as const;

export type PathKey = keyof typeof PATHS;
export type Path = (typeof PATHS)[PathKey];
