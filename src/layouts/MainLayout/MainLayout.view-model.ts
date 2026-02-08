import { useAppStore } from "@/store";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayoutViewModel = ({ children }: MainLayoutProps) => {
  const { isSidebarOpen, toggleSidebar } = useAppStore();

  return {
    children,
    isSidebarOpen,
    toggleSidebar,
  };
};

export type IMainLayoutViewModel = ReturnType<typeof MainLayoutViewModel>;
