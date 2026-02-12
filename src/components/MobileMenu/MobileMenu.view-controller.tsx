import { bind } from "@/utils";
import { motion, AnimatePresence } from "@/lib/framer-motion";
import type { Variants } from "@/lib/framer-motion";
import {
  MobileMenuViewModel,
  type IMobileMenuViewModel,
} from "./MobileMenu.view-model";
import {
  IconClose,
  IconHome,
  IconFolder,
  IconRadar,
  IconActivity,
  IconMail,
  IconMoon,
} from "@/assets";
import { PATHS } from "@/router";
import { LanguageSwitcher } from "@/components";

// Animation variants
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const menuVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", damping: 30, stiffness: 300 },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.2 },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Navigation items configuration
const navItems = [
  { path: PATHS.HOME, icon: IconHome, labelKey: "navigation.home" as const },
  { path: PATHS.PROJECTS, icon: IconFolder, labelKey: "navigation.projects" as const },
  { path: PATHS.SKILLS, icon: IconRadar, labelKey: "navigation.skills" as const },
  { path: PATHS.ACTIVITY, icon: IconActivity, labelKey: "navigation.activity" as const },
  { path: PATHS.CONTACT, icon: IconMail, labelKey: "navigation.contact" as const },
];

function MobileMenuViewController({
  isOpen,
  onClose,
  currentPath,
  t,
  handleNavigation,
}: IMobileMenuViewModel) {
  const isActive = (path: string) => currentPath === path;

  const getNavItemClass = (path: string) =>
    isActive(path)
      ? "text-[var(--color-accent)]"
      : "text-[var(--color-text-primary)]";

  const getIconClass = (path: string) =>
    isActive(path) ? "w-6 h-6" : "w-6 h-6 opacity-70";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-[300px] bg-[var(--color-bg-primary)] z-50 md:hidden flex flex-col"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-[var(--color-accent)] rounded-md">
                  <span className="font-secondary text-base font-bold text-[var(--color-bg-primary)]">
                    A
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-[var(--color-bg-secondary)] transition-colors"
                aria-label={t("common.close")}
              >
                <img src={IconClose} alt="" className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <motion.nav
              className="flex-1 px-6 py-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <ul className="flex flex-col gap-2">
                {navItems.map(({ path, icon, labelKey }) => (
                  <motion.li key={path} variants={itemVariants}>
                    <button
                      onClick={() => handleNavigation(path)}
                      className={`flex items-center gap-4 w-full px-4 py-3 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors ${getNavItemClass(path)}`}
                    >
                      <img
                        src={icon}
                        alt=""
                        className={getIconClass(path)}
                      />
                      <span className="font-primary text-base font-medium">
                        {t(labelKey)}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            {/* Footer section */}
            <div className="px-6 py-6 border-t border-[var(--color-border)]">
              {/* Theme Toggle */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={IconMoon}
                    alt=""
                    className="w-6 h-6 opacity-70"
                  />
                  <span className="font-primary text-base font-medium text-[var(--color-text-primary)]">
                    {t("common.darkMode")}
                  </span>
                </div>
                {/* Toggle switch placeholder */}
                <div className="w-12 h-6 bg-[var(--color-bg-secondary)] rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-[var(--color-accent)] rounded-full" />
                </div>
              </motion.div>

              {/* Language Switcher */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="mt-4 px-4"
              >
                <LanguageSwitcher />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export const MobileMenu = bind(MobileMenuViewController, MobileMenuViewModel);
