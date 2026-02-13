import { useState, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import { useLocation } from "react-router-dom";
import { PATHS } from "@/router";
import { useTheme } from "@/hooks";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayoutViewModel = ({ children }: MainLayoutProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentPath = location.pathname;
  const { isDark, toggleTheme } = useTheme();

  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return {
    children,
    t,
    currentPath,
    paths: PATHS,
    isMenuOpen,
    openMenu,
    closeMenu,
    isDark,
    toggleTheme,
  };
};

export type IMainLayoutViewModel = ReturnType<typeof MainLayoutViewModel>;
