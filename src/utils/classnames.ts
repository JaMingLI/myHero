import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for constructing className strings conditionally.
 * Combines clsx for conditional classes with tailwind-merge for proper Tailwind CSS class merging.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
