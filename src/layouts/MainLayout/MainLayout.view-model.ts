import { useTranslation } from "@/lib/i18n";
import { useLocation } from "react-router-dom";
import { PATHS } from "@/router";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayoutViewModel = ({ children }: MainLayoutProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentPath = location.pathname;

  return {
    children,
    t,
    currentPath,
    paths: PATHS,
  };
};

export type IMainLayoutViewModel = ReturnType<typeof MainLayoutViewModel>;
