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
// TODO: services

// Re-export as Service objects for cleaner API
// TODO: services

// Export DTOs

// Export constants
export { USER_ROLES, type UserRole } from "./constants";
