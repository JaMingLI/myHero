import { useState, useCallback, useMemo } from "react";
import { useTypingEffect, useMediaQuery, useTheme } from "@/hooks";
import { useTranslation } from "@/lib/i18n";
import { getGlobeTheme } from "@/lib/d3";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HomePageProps {
  // Add props if needed in the future
}

export const HomePageViewModel = (_props: HomePageProps) => {
  void _props; // Suppress unused variable warning
  const { t } = useTranslation();
  const { isDark } = useTheme();

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

  // Globe theme based on current theme mode
  const globeTheme = useMemo(() => getGlobeTheme(isDark), [isDark]);

  return {
    roleText,
    isTypingComplete,
    isDesktop,
    isGlobeReady,
    handleGlobeAnimationComplete,
    t,
    globeTheme,
  };
};

export type IHomePageViewModel = ReturnType<typeof HomePageViewModel>;
