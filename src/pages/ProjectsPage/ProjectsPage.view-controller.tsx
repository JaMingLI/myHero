import { bind } from "@/utils";
import { motion } from "@/lib/framer-motion";
import { ProjectModal } from "@/components";
import {
  ProjectsPageViewModel,
  type IProjectsPageViewModel,
  type FilterType,
  type Project,
  type FilterDef,
} from "./ProjectsPage.view-model";
import type { Variants } from "@/lib/framer-motion";
import type { TranslationKey } from "@/i18n/types";

// Animation variants for staggered entry
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

// Translation function type
type TFunction = (key: TranslationKey) => string;

// Filter chip component
function FilterChip({
  filter,
  isActive,
  onClick,
  t,
}: {
  filter: FilterDef;
  isActive: boolean;
  onClick: () => void;
  t: TFunction;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-1.5 rounded-2xl font-primary text-[13px] font-medium transition-colors
        ${
          isActive
            ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold"
            : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        }
      `}
    >
      {t(filter.labelKey)}
    </button>
  );
}

// Project card component
function ProjectCard({
  project,
  t,
  onClick,
}: {
  project: Project;
  t: TFunction;
  onClick: () => void;
}) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      className="flex flex-col bg-[var(--color-bg-secondary)] rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-shadow"
      variants={itemVariants}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={t(project.titleKey)}
    >
      {/* Card Image */}
      <div className="w-full h-40 md:h-44 lg:h-[180px] bg-[var(--color-bg-tertiary)] flex items-center justify-center">
        {/* Placeholder for project image */}
        <div className="w-full h-full bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] flex items-center justify-center">
          <span className="text-[var(--color-text-muted)] text-sm">
            {t(project.titleKey)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-2.5 md:gap-3 p-4 md:p-5">
        {/* Title */}
        <h3 className="font-primary text-base md:text-lg font-semibold text-[var(--color-text-primary)]">
          {t(project.titleKey)}
        </h3>

        {/* Description */}
        <p className="font-primary text-[13px] md:text-sm text-[var(--color-text-secondary)] leading-[1.5]">
          {t(project.descriptionKey)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 md:px-2.5 py-1 bg-[var(--color-bg-primary)] rounded md:rounded-xl font-secondary text-[10px] md:text-[11px] font-medium text-[var(--color-accent)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsPageViewController({
  t,
  activeFilter,
  setActiveFilter,
  filteredProjects,
  filters,
  selectedProject,
  isModalOpen,
  handleProjectClick,
  handleModalClose,
}: IProjectsPageViewModel) {
  return (
    <>
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
              {t("projects.title")}
            </h1>
            <p className="font-primary text-sm md:text-[15px] lg:text-base text-[var(--color-text-secondary)]">
              {t("projects.subtitle")}
            </p>
          </motion.div>

          {/* Filter Row */}
          <motion.div
            className="flex flex-wrap items-center gap-2"
            variants={itemVariants}
          >
            {filters.map((filter) => (
              <FilterChip
                key={filter.key}
                filter={filter}
                isActive={activeFilter === filter.key}
                onClick={() => setActiveFilter(filter.key as FilterType)}
                t={t}
              />
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                t={t}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={handleModalClose}
        t={t}
      />
    </>
  );
}

export const ProjectsPage = bind(
  ProjectsPageViewController,
  ProjectsPageViewModel
);
