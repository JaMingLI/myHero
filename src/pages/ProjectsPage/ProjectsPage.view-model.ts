import { useState, useMemo, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/i18n/types";
import {
  ImgFinTrack,
  ImgAiChat,
  ImgDevBoard,
  ImgWorkout,
  ImgCodeSnippet,
  ImgRecipeFinder,
} from "@/assets";

// Filter options for project categories
export type FilterType = "all" | "reactNative" | "react" | "ai" | "typescript" | "sideProject";

// Project data structure
export interface Project {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  fullDescriptionKey: TranslationKey;
  image: string;
  tags: string[];
  filters: FilterType[];
  githubUrl?: string;
  demoUrl?: string;
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
    fullDescriptionKey: "projects.cards.fintrack.fullDescription",
    image: ImgFinTrack,
    tags: ["React Native", "TypeScript", "Firebase"],
    filters: ["reactNative", "typescript"],
    githubUrl: "https://github.com/example/fintrack",
    demoUrl: "https://fintrack-demo.example.com",
  },
  {
    id: "aiChat",
    titleKey: "projects.cards.aiChat.title",
    descriptionKey: "projects.cards.aiChat.description",
    fullDescriptionKey: "projects.cards.aiChat.fullDescription",
    image: ImgAiChat,
    tags: ["React", "AI", "TypeScript"],
    filters: ["react", "ai", "typescript"],
    githubUrl: "https://github.com/example/ai-chat",
    demoUrl: "https://aichat-demo.example.com",
  },
  {
    id: "devboard",
    titleKey: "projects.cards.devboard.title",
    descriptionKey: "projects.cards.devboard.description",
    fullDescriptionKey: "projects.cards.devboard.fullDescription",
    image: ImgDevBoard,
    tags: ["React", "TypeScript"],
    filters: ["react", "typescript"],
    githubUrl: "https://github.com/example/devboard",
  },
  {
    id: "workout",
    titleKey: "projects.cards.workout.title",
    descriptionKey: "projects.cards.workout.description",
    fullDescriptionKey: "projects.cards.workout.fullDescription",
    image: ImgWorkout,
    tags: ["React Native", "Side Project"],
    filters: ["reactNative", "sideProject"],
    githubUrl: "https://github.com/example/workout-tracker",
  },
  {
    id: "codeSnippet",
    titleKey: "projects.cards.codeSnippet.title",
    descriptionKey: "projects.cards.codeSnippet.description",
    fullDescriptionKey: "projects.cards.codeSnippet.fullDescription",
    image: ImgCodeSnippet,
    tags: ["React", "Side Project"],
    filters: ["react", "sideProject"],
    githubUrl: "https://github.com/example/code-snippet",
    demoUrl: "https://codesnippet-demo.example.com",
  },
  {
    id: "recipeFinder",
    titleKey: "projects.cards.recipeFinder.title",
    descriptionKey: "projects.cards.recipeFinder.description",
    fullDescriptionKey: "projects.cards.recipeFinder.fullDescription",
    image: ImgRecipeFinder,
    tags: ["React Native", "AI"],
    filters: ["reactNative", "ai"],
    githubUrl: "https://github.com/example/recipe-finder",
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects based on active filter (memoized to avoid unnecessary recalculations)
  const filteredProjects = useMemo(() => {
    return activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter]);

  // Modal handlers
  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    t,
    activeFilter,
    setActiveFilter,
    filteredProjects,
    filters: FILTERS,
    selectedProject,
    isModalOpen,
    handleProjectClick,
    handleModalClose,
  };
};

export type IProjectsPageViewModel = ReturnType<typeof ProjectsPageViewModel>;
