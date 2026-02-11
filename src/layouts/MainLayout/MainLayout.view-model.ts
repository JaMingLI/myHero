import { useTranslation } from "@/lib/i18n";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayoutViewModel = ({ children }: MainLayoutProps) => {
  const { t } = useTranslation();

  return {
    children,
    t,
  };
};

export type IMainLayoutViewModel = ReturnType<typeof MainLayoutViewModel>;
