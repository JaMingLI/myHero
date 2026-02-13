import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAppStore } from "@/store";

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider manages theme class on document.documentElement
 * and listens for system preference changes
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeMode, setThemeMode } = useAppStore();

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (mode: "light" | "dark") => {
      root.classList.remove("light", "dark");
      root.classList.add(mode);
      root.setAttribute("data-theme", mode);
    };

    if (themeMode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches ? "dark" : "light");
    } else {
      applyTheme(themeMode);
    }
  }, [themeMode]);

  // Listen for system preference changes when in system mode
  useEffect(() => {
    if (themeMode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(e.matches ? "dark" : "light");
      root.setAttribute("data-theme", e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode, setThemeMode]);

  return <>{children}</>;
}
