import { useState, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/i18n/types";

// Filter options for project categories
export type FilterType = "all" | "reactNative" | "react" | "ai" | "typescript" | "sideProject";

// Project data structure
export interface Project {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  image: string;
  tags: string[];
  filters: FilterType[];
}

// Filter definition
export interface FilterDef {
  key: FilterType;
  labelKey: TranslationKey;
}

// Static project data
const PROJECTS: Project[] = [
  {
    id: "fintrack",
    titleKey: "projects.cards.fintrack.title",
    descriptionKey: "projects.cards.fintrack.description",
    image: "/images/project-fintrack.png",
    tags: ["React Native", "TypeScript", "Firebase"],
    filters: ["reactNative", "typescript"],
  },
  {
    id: "aiChat",
    titleKey: "projects.cards.aiChat.title",
    descriptionKey: "projects.cards.aiChat.description",
    image: "/images/project-aichat.png",
    tags: ["React", "AI", "TypeScript"],
    filters: ["react", "ai", "typescript"],
  },
  {
    id: "devboard",
    titleKey: "projects.cards.devboard.title",
    descriptionKey: "projects.cards.devboard.description",
    image: "/images/project-devboard.png",
    tags: ["React", "TypeScript"],
    filters: ["react", "typescript"],
  },
  {
    id: "workout",
    titleKey: "projects.cards.workout.title",
    descriptionKey: "projects.cards.workout.description",
    image: "/images/project-workout.png",
    tags: ["React Native", "Side Project"],
    filters: ["reactNative", "sideProject"],
  },
  {
    id: "codeSnippet",
    titleKey: "projects.cards.codeSnippet.title",
    descriptionKey: "projects.cards.codeSnippet.description",
    image: "/images/project-codesnippet.png",
    tags: ["React", "Side Project"],
    filters: ["react", "sideProject"],
  },
  {
    id: "recipeFinder",
    titleKey: "projects.cards.recipeFinder.title",
    descriptionKey: "projects.cards.recipeFinder.description",
    image: "/images/project-recipe.png",
    tags: ["React Native", "AI"],
    filters: ["reactNative", "ai"],
  },
];

// Available filters
const FILTERS: FilterDef[] = [
  { key: "all", labelKey: "projects.filters.all" },
  { key: "reactNative", labelKey: "projects.filters.reactNative" },
  { key: "react", labelKey: "projects.filters.react" },
  { key: "ai", labelKey: "projects.filters.ai" },
  { key: "typescript", labelKey: "projects.filters.typescript" },
  { key: "sideProject", labelKey: "projects.filters.sideProject" },
];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProjectsPageProps {
  // Add props if needed in the future
}

export const ProjectsPageViewModel = (_props: ProjectsPageProps) => {
  void _props; // Suppress unused variable warning
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Filter projects based on active filter (memoized to avoid unnecessary recalculations)
  const filteredProjects = useMemo(() => {
    return activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter]);

  return {
    t,
    activeFilter,
    setActiveFilter,
    filteredProjects,
    filters: FILTERS,
  };
};

export type IProjectsPageViewModel = ReturnType<typeof ProjectsPageViewModel>;
