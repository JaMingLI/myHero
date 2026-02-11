import type { ReactNode } from "react";
import type { TranslationKey } from "@/i18n/types";

interface SectionLabelProps {
  icon: ReactNode;
  labelKey: TranslationKey;
  t: (key: TranslationKey) => string;
}

export function SectionLabel({ icon, labelKey, t }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-2 mb-3 md:mb-4">
      <span className="text-[var(--color-accent)]">{icon}</span>
      <span className="font-secondary text-[11px] md:text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">
        {t(labelKey)}
      </span>
    </div>
  );
}
