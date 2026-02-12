import { useState, useCallback } from "react";
import { useTypingEffect, useMediaQuery } from "@/hooks";
import { useTranslation } from "@/lib/i18n";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HomePageProps {
  // Add props if needed in the future
}

export const HomePageViewModel = (_props: HomePageProps) => {
  void _props; // Suppress unused variable warning
  const { t } = useTranslation();

  // Check if viewport is desktop (≥1024px)
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Control globe animation timing - wait for Framer Motion entry animation to complete
  const [isGlobeReady, setIsGlobeReady] = useState(false);

  const handleGlobeAnimationComplete = useCallback(() => {
    setIsGlobeReady(true);
  }, []);

  // Typing effect for the role text (delayed to sync with staggered animation)
  const { displayText: roleText, isComplete: isTypingComplete } = useTypingEffect(
    "React Native Developer",
    { speed: 80, delay: 600 } // 600ms delay matches the staggered animation timing
  );

  return {
    roleText,
    isTypingComplete,
    isDesktop,
    isGlobeReady,
    handleGlobeAnimationComplete,
    t,
  };
};

export type IHomePageViewModel = ReturnType<typeof HomePageViewModel>;
