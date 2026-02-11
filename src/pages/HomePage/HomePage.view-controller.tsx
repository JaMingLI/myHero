import { bind } from "@/utils";
import { motion } from "@/lib/framer-motion";
import {
  HomePageViewModel,
  type IHomePageViewModel,
} from "./HomePage.view-model";
import {
  IconUser,
  IconSmartPhone,
  IconCode,
  IconBot,
  IconFolder,
  IconArrowRight,
  IconMail,
} from "@/assets";
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
  t,
}: IHomePageViewModel) {
  return (
    <section className="flex-1 flex items-center justify-center px-4 md:px-12 lg:px-[120px] py-10 md:py-20">
      <motion.div
        className="flex flex-col lg:flex-row items-center lg:justify-between gap-6 md:gap-8 lg:gap-20 w-full max-w-[560px] lg:max-w-[1440px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar Section - Mobile/Tablet: 先顯示, Desktop: 移到右邊 */}
        <motion.div
          className="flex flex-col items-center justify-center lg:order-2 lg:w-[400px] lg:h-[400px]"
          variants={itemVariants}
        >
          {/* Avatar with Glow Effect */}
          <div className="flex items-center justify-center w-[110px] h-[110px] md:w-[150px] md:h-[150px] lg:w-[280px] lg:h-[280px] rounded-full bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-bg-primary)] avatar-glow">
            <div className="flex items-center justify-center w-[102px] h-[102px] md:w-[140px] md:h-[140px] lg:w-[260px] lg:h-[260px] rounded-full bg-[var(--color-bg-secondary)]">
              <img
                src={IconUser}
                alt="Avatar"
                className="w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 opacity-50"
              />
            </div>
          </div>

          {/* Tech Badges - Desktop only */}
          <motion.div
            className="hidden lg:flex items-center gap-3 pt-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-[6px] px-3 py-[6px] bg-[var(--color-bg-secondary)] rounded-2xl">
              <img src={IconSmartPhone} alt={t("badges.mobile")} className="w-[14px] h-[14px]" />
              <span className="font-secondary text-[11px] font-medium text-[var(--color-text-secondary)]">
                {t("badges.mobile")}
              </span>
            </div>
            <div className="flex items-center gap-[6px] px-3 py-[6px] bg-[var(--color-bg-secondary)] rounded-2xl">
              <img src={IconCode} alt={t("badges.frontend")} className="w-[14px] h-[14px]" />
              <span className="font-secondary text-[11px] font-medium text-[var(--color-text-secondary)]">
                {t("badges.frontend")}
              </span>
            </div>
            <div className="flex items-center gap-[6px] px-3 py-[6px] bg-[var(--color-bg-secondary)] rounded-2xl">
              <img src={IconBot} alt={t("badges.aiTools")} className="w-[14px] h-[14px]" />
              <span className="font-secondary text-[11px] font-medium text-[var(--color-text-secondary)]">
                {t("badges.aiTools")}
              </span>
            </div>
          </motion.div>
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
              className={`font-secondary text-sm md:text-2xl lg:text-[28px] font-light text-[var(--color-accent)] md:hidden lg:inline typing-cursor ${isTypingComplete ? "typing-cursor-blink" : ""}`}
            >
              |
            </span>
            <div
              className={`hidden md:block lg:hidden w-[2px] h-[18px] bg-[var(--color-accent)] ${isTypingComplete ? "typing-cursor-blink" : ""}`}
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
            <motion.button
              className="flex items-center justify-center gap-2 px-8 md:px-7 py-3 md:py-[14px] bg-[var(--color-accent)] rounded-lg font-primary text-base md:text-sm font-semibold text-[var(--color-bg-primary)] hover:bg-[#1ab8d4] transition-colors w-full md:w-auto lg:shadow-[0_2px_20px_rgba(34,211,238,0.4)] btn-primary-glow"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <img
                src={IconFolder}
                alt=""
                className="w-[18px] h-[18px] md:w-4 md:h-4 lg:hidden"
              />
              {t("hero.viewProjects")}
              <img
                src={IconArrowRight}
                alt=""
                className="hidden lg:block w-4 h-4"
              />
            </motion.button>
            <motion.button
              className="flex items-center justify-center gap-2 px-8 md:px-7 py-3 md:py-[14px] rounded-lg font-primary text-base md:text-sm font-semibold md:font-medium text-[var(--color-accent)] md:text-[var(--color-text-secondary)] border border-[var(--color-accent)] md:border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors w-full md:w-auto"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <img
                src={IconMail}
                alt=""
                className="w-[18px] h-[18px] md:w-4 md:h-4 lg:hidden"
              />
              {t("hero.contactMe")}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export const HomePage = bind(HomePageViewController, HomePageViewModel);
