import { Link } from "react-router-dom";
import { bind, cn } from "@/utils";
import { motion } from "@/lib/framer-motion";
import {
  HomePageViewModel,
  type IHomePageViewModel,
} from "./HomePage.view-model";
import {
  IconFolder,
  IconArrowRight,
  IconMail,
} from "@/assets";
import { WorldAirportsVoronoi, ProjectionTransitions } from "@/components";
import { PATHS } from "@/router/paths";
import type { Variants } from "@/lib/framer-motion";

// Animation variants for staggered entry
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Button interaction variants
const buttonVariants: Variants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

function HomePageViewController({
  roleText,
  isTypingComplete,
  isDesktop,
  isGlobeReady,
  handleGlobeAnimationComplete,
  t,
  globeTheme,
  projectionTheme,
}: IHomePageViewModel) {
  return (
    <section className="relative flex-1 flex items-center justify-center px-4 md:px-12 lg:px-[120px] py-10 md:py-20">
      <motion.div
        className="flex flex-col lg:flex-row items-center lg:justify-between gap-6 md:gap-8 lg:gap-20 w-full max-w-[560px] lg:max-w-[1440px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar Section - Mobile/Tablet: 顯示 Avatar, Desktop: 空 placeholder 維持佈局 */}
        <motion.div
          className="flex flex-col items-center justify-center lg:order-2 lg:size-[clamp(400px,min(50vw,calc(100vh-200px)),900px)]"
          variants={itemVariants}
          onAnimationComplete={handleGlobeAnimationComplete}
        >
          {isDesktop ? (
            /* Desktop: 空 placeholder 維持佈局空間，Globe 在 motion.div 外部渲染 */
            <div className="w-full h-full" />
          ) : (
            /* Mobile/Tablet: Projection Transitions Globe */
            <ProjectionTransitions
              className="w-[110px] h-[110px] md:w-[150px] md:h-[150px]"
              theme={projectionTheme}
              autoAnimate
            />
          )}
        </motion.div>

        {/* Content Section - Desktop: 左邊 */}
        <div className="flex flex-col items-center lg:items-start lg:order-1 lg:flex-1 gap-4 lg:gap-8">
          {/* Greeting */}
          <motion.div className="flex items-center gap-2" variants={itemVariants}>
            <div className="w-2 h-2 bg-[var(--color-accent)] rounded"></div>
            <span
              className="font-secondary text-xs md:text-sm font-medium text-[var(--color-accent)]"
              style={{ letterSpacing: "0.08em" }}
            >
              {t("hero.greeting")}
            </span>
          </motion.div>

          {/* Hero Name */}
          <motion.h1
            className="font-primary text-[28px] md:text-[48px] lg:text-[64px] font-bold text-[var(--color-text-primary)] leading-[1.1] text-center lg:text-left"
            variants={itemVariants}
          >
            Alen
          </motion.h1>

          {/* Typing Effect */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-1"
            variants={itemVariants}
          >
            <span className="font-secondary text-sm md:text-2xl lg:text-[28px] font-semibold text-[var(--color-accent)] md:text-[var(--color-text-secondary)] lg:text-[var(--color-accent)]">
              {roleText}
            </span>
            <span
              className={cn(
              "font-secondary text-sm md:text-2xl lg:text-[28px] font-light text-[var(--color-accent)] md:hidden lg:inline typing-cursor",
              isTypingComplete && "typing-cursor-blink"
            )}
            >
              |
            </span>
            <div
              className={cn(
              "hidden md:block lg:hidden w-[2px] h-[18px] bg-[var(--color-accent)]",
              isTypingComplete && "typing-cursor-blink"
            )}
            ></div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="font-primary text-sm md:text-base text-[var(--color-text-secondary)] leading-[1.6] text-center lg:text-left max-w-full lg:max-w-[520px]"
            variants={itemVariants}
          >
            <span className="md:hidden">
              {t("hero.descriptionMobile")}
            </span>
            <span className="hidden md:inline">
              {t("hero.descriptionDesktop")}
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full md:w-auto"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full md:w-auto"
            >
              <Link
                to={PATHS.PROJECTS}
                className="flex items-center justify-center gap-2 px-8 md:px-7 py-3 md:py-[14px] bg-[var(--color-accent)] rounded-lg font-primary text-base md:text-sm font-semibold text-[var(--color-bg-primary)] hover:bg-[var(--color-accent-hover)] transition-colors w-full md:w-auto lg:shadow-[0_2px_20px_rgba(var(--color-accent-shadow),0.4)] btn-primary-glow"
              >
                <IconFolder className="w-[18px] h-[18px] md:w-4 md:h-4 lg:hidden" />
                {t("hero.viewProjects")}
                <IconArrowRight className="hidden lg:block w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full md:w-auto"
            >
              <Link
                to={PATHS.CONTACT}
                className="flex items-center justify-center gap-2 px-8 md:px-7 py-3 md:py-[14px] rounded-lg font-primary text-base md:text-sm font-semibold md:font-medium text-[var(--color-accent)] md:text-[var(--color-text-secondary)] border border-[var(--color-accent)] md:border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors w-full md:w-auto"
              >
                <IconMail className="w-[18px] h-[18px] md:w-4 md:h-4 lg:hidden" />
                {t("hero.contactMe")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Globe 完全在 motion.div 外部 - 使用絕對定位覆蓋 placeholder */}
      {/* 這樣可以完全避免 Framer Motion 追蹤 Globe，防止動畫與 Voronoi 計算競爭主線程 */}
      {isDesktop && isGlobeReady && (
        <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none px-[120px]">
          <div className="flex w-full max-w-[1440px] justify-end">
            <div className="size-[clamp(400px,min(50vw,calc(100vh-200px)),900px)] pointer-events-auto">
              <WorldAirportsVoronoi autoRotate theme={globeTheme} className="w-full h-full" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export const HomePage = bind(HomePageViewController, HomePageViewModel);
