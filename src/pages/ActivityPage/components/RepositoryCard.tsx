import { motion } from "@/lib/framer-motion";
import { IconFolderGit2, IconStar } from "@/assets/icons";
import type { RepoDto } from "@/domain";
import type { Variants } from "@/lib/framer-motion";

interface RepositoryCardProps {
  repo: RepoDto;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/**
 * Formats a relative time string (e.g., "2 days ago")
 */
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function RepositoryCard({ repo }: RepositoryCardProps) {
  return (
    <motion.a
      href={repo.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#1E293B] rounded-lg p-4 md:p-5 hover:ring-2 hover:ring-[var(--color-accent)] transition-shadow"
      variants={cardVariants}
    >
      {/* Header with icon and name */}
      <div className="flex items-center gap-2 mb-2">
        <img src={IconFolderGit2} alt="" className="w-4 h-4" />
        <span className="font-mono text-sm text-[var(--color-accent)] font-medium truncate">
          {repo.name}
        </span>
      </div>

      {/* Description */}
      {repo.description && (
        <p className="font-primary text-[12px] md:text-[13px] text-[#94A3B8] leading-[1.5] line-clamp-2 mb-3">
          {repo.description}
        </p>
      )}

      {/* Meta row: language, stars, updated time */}
      <div className="flex items-center gap-3 text-[11px] md:text-xs text-[#64748B]">
        {/* Language */}
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]" />
            <span>{repo.language}</span>
          </div>
        )}

        {/* Stars */}
        {repo.starCount > 0 && (
          <div className="flex items-center gap-1">
            <img src={IconStar} alt="" className="w-3 h-3" />
            <span>{repo.starCount}</span>
          </div>
        )}

        {/* Updated time */}
        <span>{formatRelativeTime(repo.updatedAt)}</span>
      </div>
    </motion.a>
  );
}
