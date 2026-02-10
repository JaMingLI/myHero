export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayoutViewModel = ({ children }: MainLayoutProps) => {
  return {
    children,
  };
};

export type IMainLayoutViewModel = ReturnType<typeof MainLayoutViewModel>;
