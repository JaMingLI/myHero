import { useMemo } from "react";
import { useAppStore } from "@/store";
import type { ThemeMode } from "@/app/config";

export interface UseThemeReturn {
  /** Current theme mode setting */
  themeMode: ThemeMode;
  /** Whether the current effective theme is dark */
  isDark: boolean;
  /** Set theme mode */
  setThemeMode: (mode: ThemeMode) => void;
  /** Toggle between light and dark */
  toggleTheme: () => void;
}

/**
 * Hook for accessing and controlling theme
 */
export function useTheme(): UseThemeReturn {
  const { themeMode, setThemeMode, toggleTheme } = useAppStore();

  const isDark = useMemo(() => {
    if (themeMode === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return themeMode === "dark";
  }, [themeMode]);

  return {
    themeMode,
    isDark,
    setThemeMode,
    toggleTheme,
  };
}
