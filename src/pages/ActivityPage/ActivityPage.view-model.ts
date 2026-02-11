import { useQuery, QUERY_KEYS } from "@/lib/react-query";
import { useTranslation } from "@/lib/i18n";
import { GitHubService } from "@/domain";
import type { RepoDto, ActivityDto } from "@/domain";
import type { TranslationKey } from "@/i18n/types";

// Default GitHub username - can be made configurable
const GITHUB_USERNAME = "JaMingLI";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ActivityPageProps {
  // Add props if needed in the future
}

export const ActivityPageViewModel = (_props: ActivityPageProps) => {
  void _props; // Suppress unused variable warning
  const { t } = useTranslation();

  // Fetch repositories
  const {
    data: repositories = [],
    isLoading: isLoadingRepos,
    error: reposError,
  } = useQuery({
    queryKey: QUERY_KEYS.GITHUB.REPOS(GITHUB_USERNAME),
    queryFn: () => GitHubService.getRepositories(GITHUB_USERNAME),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch activity
  const {
    data: activities = [],
    isLoading: isLoadingActivity,
    error: activityError,
  } = useQuery({
    queryKey: QUERY_KEYS.GITHUB.ACTIVITY(GITHUB_USERNAME),
    queryFn: () => GitHubService.getActivity(GITHUB_USERNAME),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    t: t as (key: TranslationKey) => string,
    repositories,
    activities,
    isLoadingRepos,
    isLoadingActivity,
    hasError: Boolean(reposError || activityError),
  };
};

export type IActivityPageViewModel = ReturnType<typeof ActivityPageViewModel>;

// Re-export types for components
export type { RepoDto, ActivityDto };
