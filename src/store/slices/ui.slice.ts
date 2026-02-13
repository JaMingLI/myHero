import type { StateCreator } from "zustand";
import type { ThemeMode } from "@/app/config";
import {
  THEME_STORAGE_KEY,
  DEFAULT_THEME_MODE,
} from "@/app/config";

export interface UiSlice {
  // State
  isSidebarOpen: boolean;
  isLoading: boolean;
  themeMode: ThemeMode;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

/**
 * Get initial theme mode from localStorage or default
 */
const getInitialThemeMode = (): ThemeMode => {
  if (typeof window === "undefined") return DEFAULT_THEME_MODE;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return DEFAULT_THEME_MODE;
};

export const createUiSlice: StateCreator<UiSlice> = (set) => ({
  // Initial state
  isSidebarOpen: true,
  isLoading: false,
  themeMode: getInitialThemeMode(),

  // Actions
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),
  setThemeMode: (mode) => {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    set({ themeMode: mode });
  },
  toggleTheme: () =>
    set((state) => {
      // Toggle between light and dark (skip system)
      const newMode: ThemeMode = state.themeMode === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_STORAGE_KEY, newMode);
      return { themeMode: newMode };
    }),
});
