import { useTranslation } from "@/lib/i18n";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NotFoundPageProps {
  // Add props if needed in the future
}

export const NotFoundPageViewModel = (_props: NotFoundPageProps) => {
  void _props; // Suppress unused variable warning
  const { t } = useTranslation();

  return {
    t,
  };
};

export type INotFoundPageViewModel = ReturnType<typeof NotFoundPageViewModel>;
