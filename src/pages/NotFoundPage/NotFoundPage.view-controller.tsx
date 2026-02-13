import { Link } from "react-router-dom";
import { bind } from "@/utils";
import { motion } from "@/lib/framer-motion";
import {
  NotFoundPageViewModel,
  type INotFoundPageViewModel,
} from "./NotFoundPage.view-model";
import { IconArrowLeft } from "@/assets";
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

function NotFoundPageViewController({ t }: INotFoundPageViewModel) {
  return (
    <section className="flex-1 flex items-center justify-center px-4 md:px-6 lg:px-12 py-10 md:py-20">
      <motion.div
        className="flex flex-col items-center gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Large Number */}
        <motion.span
          className="text-[80px] md:text-[100px] lg:text-[120px] font-bold text-[var(--color-accent)] opacity-15 font-mono leading-none select-none"
          variants={itemVariants}
        >
          404
        </motion.span>

        {/* Title */}
        <motion.h1
          className="text-2xl md:text-[28px] lg:text-[32px] font-bold text-[var(--color-text-primary)] text-center"
          variants={itemVariants}
        >
          {t("notFound.title")}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-sm md:text-[15px] lg:text-base text-[var(--color-text-secondary)] text-center max-w-[300px] md:max-w-none"
          variants={itemVariants}
        >
          {t("notFound.description")}
        </motion.p>

        {/* Back to Home Button */}
        <motion.div variants={itemVariants}>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to={PATHS.HOME}
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-[var(--color-accent)] rounded-lg font-primary text-sm font-semibold text-[var(--color-bg-primary)] hover:bg-[var(--color-accent-hover)] transition-colors shadow-[0_2px_20px_rgba(var(--color-accent-shadow),0.4)]"
            >
              <IconArrowLeft className="w-4 h-4 text-[var(--color-bg-primary)]" />
              {t("notFound.backHome")}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export const NotFoundPage = bind(NotFoundPageViewController, NotFoundPageViewModel);
