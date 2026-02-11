import { motion } from "@/lib/framer-motion";
import { EventBadge } from "./EventBadge";
import type { ActivityDto } from "@/domain";
import type { TranslationKey } from "@/i18n/types";
import type { Variants } from "@/lib/framer-motion";

interface ActivityTimelineProps {
  activities: ActivityDto[];
  isLoading: boolean;
  t: (key: TranslationKey) => string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/**
 * Formats a relative time string for activity events
 */
function formatActivityTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function ActivityTimeline({
  activities,
  isLoading,
  t,
}: ActivityTimelineProps) {
  if (isLoading) {
    return (
      <div className="bg-[#1E293B] rounded-lg p-4 md:p-5">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#334155] mt-2" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-[#334155] rounded w-3/4" />
                <div className="h-3 bg-[#334155] rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="bg-[#1E293B] rounded-lg p-4 md:p-5 text-center">
        <p className="text-[#94A3B8] text-sm">{t("activity.noActivity")}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-[#1E293B] rounded-lg divide-y divide-[#0F172A]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {activities.map((activity) => (
        <motion.div
          key={activity.id}
          className="flex items-start gap-3 p-4 md:p-5"
          variants={itemVariants}
        >
          {/* Timeline dot */}
          <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-1.5 flex-shrink-0" />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                {/* Event title */}
                <p className="font-primary text-[13px] md:text-sm text-[var(--color-text-primary)] leading-[1.4] truncate">
                  {activity.title}
                </p>
                {/* Repo name and time */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-[11px] md:text-xs text-[#64748B]">
                    {activity.repoName}
                  </span>
                  <span className="text-[#475569]">·</span>
                  <span className="text-[11px] md:text-xs text-[#64748B]">
                    {formatActivityTime(activity.createdAt)}
                  </span>
                </div>
              </div>

              {/* Event type badge */}
              <EventBadge type={activity.type} t={t} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
