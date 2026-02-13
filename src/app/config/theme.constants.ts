/**
 * Theme mode types and constants
 */

export type ThemeMode = "light" | "dark" | "system";

export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export const THEME_STORAGE_KEY = "theme-mode";

export const DEFAULT_THEME_MODE: ThemeMode = "system";
