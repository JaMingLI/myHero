import { useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import { useAppStore } from "@/store";
import type { SkillData } from "@/store/slices/skills.slice";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SkillsPageProps {
  // Add props if needed in the future
}

export interface ISkillsPageViewModel {
  t: ReturnType<typeof useTranslation>["t"];
  skills: SkillData[];
  handleSkillChange: (id: string, level: number) => void;
  handleReset: () => void;
}

export const SkillsPageViewModel = (
  _props: SkillsPageProps
): ISkillsPageViewModel => {
  void _props; // Suppress unused variable warning
  const { t } = useTranslation();
  const { skills, setSkillLevel, resetSkills } = useAppStore();

  const handleSkillChange = useCallback(
    (id: string, level: number) => {
      setSkillLevel(id, level);
    },
    [setSkillLevel]
  );

  const handleReset = useCallback(() => {
    resetSkills();
  }, [resetSkills]);

  return {
    t,
    skills,
    handleSkillChange,
    handleReset,
  };
};
