/**
 * Business Constants
 * Domain-specific constants used across services
 */

// TODO: constants
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  GUEST: "guest",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
