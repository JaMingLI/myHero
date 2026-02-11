import type { ActivityEventType } from "@/domain";
import type { TranslationKey } from "@/i18n/types";

interface EventBadgeProps {
  type: ActivityEventType;
  t: (key: TranslationKey) => string;
}

const TYPE_STYLES: Record<ActivityEventType, string> = {
  push: "bg-green-500/20 text-green-400",
  pr: "bg-purple-500/20 text-purple-400",
  create: "bg-blue-500/20 text-blue-400",
  issue: "bg-orange-500/20 text-orange-400",
  other: "bg-gray-500/20 text-gray-400",
};

const TYPE_KEYS: Record<ActivityEventType, TranslationKey> = {
  push: "activity.eventTypes.push",
  pr: "activity.eventTypes.pr",
  create: "activity.eventTypes.create",
  issue: "activity.eventTypes.issue",
  other: "activity.eventTypes.other",
};

export function EventBadge({ type, t }: EventBadgeProps) {
  return (
    <span
      className={`
        px-2 py-0.5 rounded text-[10px] md:text-[11px] font-medium uppercase
        ${TYPE_STYLES[type]}
      `}
    >
      {t(TYPE_KEYS[type])}
    </span>
  );
}
