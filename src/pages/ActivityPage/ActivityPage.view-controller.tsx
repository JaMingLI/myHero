import { bind } from "@/utils";
import { motion } from "@/lib/framer-motion";
import { IconFolderGit2, IconActivity } from "@/assets/icons";
import {
  ActivityPageViewModel,
  type IActivityPageViewModel,
} from "./ActivityPage.view-model";
import { SectionLabel } from "./components/SectionLabel";
import { RepositoryCard } from "./components/RepositoryCard";
import { ActivityTimeline } from "./components/ActivityTimeline";
import type { Variants } from "@/lib/framer-motion";

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

function ActivityPageViewController({
  t,
  repositories,
  activities,
  isLoadingRepos,
  isLoadingActivity,
}: IActivityPageViewModel) {
  return (
    <section className="flex-1 flex flex-col px-4 md:px-8 lg:px-[120px] py-5 md:py-8 lg:py-12">
      <motion.div
        className="flex flex-col gap-5 md:gap-6 lg:gap-8 w-full max-w-[1440px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Header */}
        <motion.div className="flex flex-col gap-2" variants={itemVariants}>
          <h1 className="font-primary text-2xl md:text-[28px] lg:text-[32px] font-bold text-[var(--color-text-primary)]">
            {t("activity.title")}
          </h1>
          <p className="font-primary text-sm md:text-[15px] lg:text-base text-[#94A3B8]">
            {t("activity.subtitle")}
          </p>
        </motion.div>

        {/* Two-column layout (stacks on mobile) */}
        <motion.div
          className="flex flex-col lg:flex-row gap-5 md:gap-6 lg:gap-8"
          variants={itemVariants}
        >
          {/* Repositories Column */}
          <div className="flex-1 lg:max-w-[50%]">
            <SectionLabel
              icon={<img src={IconFolderGit2} alt="" className="w-4 h-4" />}
              labelKey="activity.sections.repositories"
              t={t}
            />

            {isLoadingRepos ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-[#1E293B] rounded-lg p-4 md:p-5 animate-pulse"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded bg-[#334155]" />
                      <div className="h-4 bg-[#334155] rounded w-24" />
                    </div>
                    <div className="h-3 bg-[#334155] rounded w-full mb-3" />
                    <div className="flex gap-3">
                      <div className="h-3 bg-[#334155] rounded w-16" />
                      <div className="h-3 bg-[#334155] rounded w-12" />
                    </div>
                  </div>
                ))}
              </div>
            ) : repositories.length === 0 ? (
              <div className="bg-[#1E293B] rounded-lg p-4 md:p-5 text-center">
                <p className="text-[#94A3B8] text-sm">{t("activity.noRepos")}</p>
              </div>
            ) : (
              <motion.div
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {repositories.map((repo) => (
                  <RepositoryCard key={repo.id} repo={repo} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Activity Timeline Column */}
          <div className="flex-1 lg:max-w-[50%]">
            <SectionLabel
              icon={<img src={IconActivity} alt="" className="w-4 h-4" />}
              labelKey="activity.sections.timeline"
              t={t}
            />

            <ActivityTimeline
              activities={activities}
              isLoading={isLoadingActivity}
              t={t}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export const ActivityPage = bind(
  ActivityPageViewController,
  ActivityPageViewModel
);
