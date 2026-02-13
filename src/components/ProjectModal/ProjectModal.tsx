import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "@/lib/framer-motion";
import { useMediaQuery, useFocusTrap, useBodyScrollLock } from "@/hooks";
import type { TranslationKey } from "@/i18n/types";
import type { Variants } from "@/lib/framer-motion";

export interface ProjectModalData {
  id: string;
  titleKey: TranslationKey;
  fullDescriptionKey: TranslationKey;
  image: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface ProjectModalProps {
  isOpen: boolean;
  project: ProjectModalData | null;
  onClose: () => void;
  t: (key: TranslationKey) => string;
}

// Animation variants for desktop modal
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const desktopModalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

// Animation variants for mobile bottom sheet
const mobileSheetVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "spring", damping: 30, stiffness: 300 },
  },
  exit: {
    y: "100%",
    transition: { duration: 0.2 },
  },
};

export function ProjectModal({ isOpen, project, onClose, t }: ProjectModalProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen);

  // Lock body scroll when modal is open
  useBodyScrollLock(isOpen);

  // Handle escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "#0A0F1C99" }}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          {isMobile ? (
            // Mobile Bottom Sheet
            <motion.div
              ref={containerRef}
              className="fixed bottom-0 left-0 right-0 bg-[var(--color-bg-secondary)] rounded-t-2xl max-h-[90vh] overflow-y-auto"
              variants={mobileSheetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 bg-[var(--color-text-muted)] rounded-full" />
              </div>

              {/* Image */}
              <div className="w-full h-[200px] bg-[var(--color-bg-tertiary)] overflow-hidden">
                <img
                  src={project.image}
                  alt={t(project.titleKey)}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body */}
              <div className="flex flex-col gap-4 p-5 px-4">
                {/* Title */}
                <h2
                  id="modal-title"
                  className="font-primary text-xl font-bold text-[var(--color-text-primary)]"
                >
                  {t(project.titleKey)}
                </h2>

                {/* Description */}
                <p className="font-primary text-[13px] text-[#94A3B8] leading-[1.6]">
                  {t(project.fullDescriptionKey)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-[var(--color-bg-primary)] rounded-xl font-secondary text-xs font-medium text-[var(--color-accent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-primary text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      {t("projects.modal.viewGithub")}
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 border border-[var(--color-accent)] text-[var(--color-accent)] font-primary text-sm font-semibold rounded-lg hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)] transition-colors"
                    >
                      {t("projects.modal.liveDemo")}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            // Desktop Centered Modal
            <motion.div
              ref={containerRef}
              className="relative w-[640px] max-h-[90vh] bg-[var(--color-bg-secondary)] rounded-xl overflow-hidden"
              variants={desktopModalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-[#0A0F1C99] rounded-full text-white hover:bg-[#0A0F1CCC] transition-colors"
                aria-label="Close modal"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L13 13M1 13L13 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Image */}
              <div className="w-full h-[280px] bg-[var(--color-bg-tertiary)] overflow-hidden">
                <img
                  src={project.image}
                  alt={t(project.titleKey)}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body */}
              <div className="flex flex-col gap-5 p-8">
                {/* Title */}
                <h2
                  id="modal-title"
                  className="font-primary text-2xl font-bold text-[var(--color-text-primary)]"
                >
                  {t(project.titleKey)}
                </h2>

                {/* Description */}
                <p className="font-primary text-sm text-[#94A3B8] leading-[1.6]">
                  {t(project.fullDescriptionKey)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-[var(--color-bg-primary)] rounded-xl font-secondary text-xs font-medium text-[var(--color-accent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-primary text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      {t("projects.modal.viewGithub")}
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-[var(--color-accent)] text-[var(--color-accent)] font-primary text-sm font-semibold rounded-lg hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)] transition-colors"
                    >
                      {t("projects.modal.liveDemo")}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
