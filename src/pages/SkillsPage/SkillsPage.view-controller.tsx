import { bind } from "@/utils";
import { motion } from "@/lib/framer-motion";
import type { Variants } from "@/lib/framer-motion";
import { IconRotateCcw } from "@/assets";
import type { TranslationKey } from "@/i18n/types";
import { HexagonRadar, SkillSlider } from "./components";
import {
  SkillsPageViewModel,
  type ISkillsPageViewModel,
} from "./SkillsPage.view-model";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Skill labels for i18n
const SKILL_KEYS = [
  "react",
  "reactNative",
  "typescript",
  "css",
  "git",
  "ai",
] as const;

function SkillsPageViewController({
  t,
  skills,
  handleSkillChange,
  handleReset,
}: ISkillsPageViewModel) {
  return (
    <section className="flex-1 flex items-center justify-center px-4 md:px-6 lg:px-12 py-6 md:py-10">
      <motion.div
        className="flex flex-col lg:flex-row items-center lg:items-start gap-5 md:gap-6 lg:gap-10 w-full max-w-[1200px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hexagon Radar Container */}
        <motion.div
          className="flex items-center justify-center w-full lg:flex-1"
          variants={itemVariants}
        >
          <div className="w-[358px] h-[360px] md:w-[446px] md:h-[480px] lg:w-[700px] lg:h-[700px]">
            <HexagonRadar skills={skills} />
          </div>
        </motion.div>

        {/* Skills Panel */}
        <motion.div
          className="w-full lg:w-[400px] bg-[#111827] rounded-xl border border-[#1E293B] p-4 md:p-5 lg:p-6"
          variants={itemVariants}
        >
          {/* Panel Header */}
          <div className="mb-5 lg:mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-white">
              {t("skills.title")}
            </h2>
            <p className="text-sm text-[#64748B] mt-1 hidden md:block">
              {t("skills.hint")}
            </p>
            <p className="text-sm text-[#64748B] mt-1 md:hidden">
              {t("skills.hintMobile")}
            </p>
          </div>

          {/* Skill Sliders */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {SKILL_KEYS.map((key) => {
              const skill = skills.find((s) => s.id === key);
              if (!skill) return null;

              return (
                <SkillSlider
                  key={skill.id}
                  id={skill.id}
                  label={String(t(`skills.items.${skill.id}` as TranslationKey))}
                  value={skill.level}
                  onChange={(level) => handleSkillChange(skill.id, level)}
                />
              );
            })}
          </div>

          {/* Reset Button */}
          <motion.button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 w-full mt-6 px-4 py-3 bg-[#1E293B] rounded-lg text-[#94A3B8] font-medium hover:bg-[#2D3A4F] hover:text-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={IconRotateCcw} alt="" className="w-4 h-4 opacity-70" />
            {t("skills.reset")}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export const SkillsPage = bind(SkillsPageViewController, SkillsPageViewModel);
