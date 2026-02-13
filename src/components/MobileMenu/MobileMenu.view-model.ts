import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { useTheme } from "@/hooks";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export const MobileMenuViewModel = ({
  isOpen,
  onClose,
  currentPath,
}: MobileMenuProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path);
      onClose();
    },
    [navigate, onClose]
  );

  return {
    isOpen,
    onClose,
    currentPath,
    t,
    handleNavigation,
    isDark,
    toggleTheme,
  };
};

export type IMobileMenuViewModel = ReturnType<typeof MobileMenuViewModel>;
