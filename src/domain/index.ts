/**
 * Domain Gatekeeper
 *
 * This is the ONLY entry point to the domain layer.
 * UI layer must import from here, not from internal paths.
 *
 * ✅ Allowed: import { UserService, type UserDto } from '@/domain';
 * ❌ Forbidden: import { getUserUsecase } from '@/domain/services/user';
 */

// Services (Use Cases)
import {
  getRepositoriesUsecase,
  getActivityUsecase,
} from "./services";

// Re-export as Service objects for cleaner API
export const GitHubService = {
  getRepositories: getRepositoriesUsecase,
  getActivity: getActivityUsecase,
};

// Export DTOs
export type { RepoDto, ActivityDto, ActivityEventType } from "./services";

// Export constants
export { USER_ROLES, type UserRole } from "./constants";
