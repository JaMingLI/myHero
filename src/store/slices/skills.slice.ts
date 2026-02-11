import type { StateCreator } from "zustand";

export interface SkillData {
  id: string;
  level: number; // 0-100
}

export interface SkillsSlice {
  // State
  skills: SkillData[];

  // Actions
  setSkillLevel: (id: string, level: number) => void;
  resetSkills: () => void;
}

const STORAGE_KEY = "myHero_skills";

const DEFAULT_SKILLS: SkillData[] = [
  { id: "react", level: 85 },
  { id: "reactNative", level: 90 },
  { id: "typescript", level: 75 },
  { id: "css", level: 70 },
  { id: "git", level: 65 },
  { id: "ai", level: 60 },
];

// Helper to load skills from localStorage
const loadSkillsFromStorage = (): SkillData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as SkillData[];
      // Validate structure
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (s) =>
            typeof s.id === "string" &&
            typeof s.level === "number" &&
            s.level >= 0 &&
            s.level <= 100
        )
      ) {
        return parsed;
      }
    }
  } catch {
    // If parsing fails, return defaults
  }
  return DEFAULT_SKILLS;
};

// Helper to save skills to localStorage
const saveSkillsToStorage = (skills: SkillData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
  } catch {
    // Silently fail if localStorage is not available
  }
};

export const createSkillsSlice: StateCreator<SkillsSlice> = (set) => ({
  // Initial state from localStorage or defaults
  skills: loadSkillsFromStorage(),

  // Actions
  setSkillLevel: (id, level) => {
    const clampedLevel = Math.max(0, Math.min(100, level));
    set((state) => {
      const newSkills = state.skills.map((skill) =>
        skill.id === id ? { ...skill, level: clampedLevel } : skill
      );
      saveSkillsToStorage(newSkills);
      return { skills: newSkills };
    });
  },

  resetSkills: () => {
    saveSkillsToStorage(DEFAULT_SKILLS);
    set({ skills: DEFAULT_SKILLS });
  },
});
