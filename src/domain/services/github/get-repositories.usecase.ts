import { GitHubRepository } from "../../repositories";
import type { RepoDto } from "./types";

/**
 * Get Repositories Use Case
 * Fetches and transforms GitHub repositories into DTOs
 */
export const getRepositoriesUsecase = async (
  username: string
): Promise<RepoDto[]> => {
  const repos = await GitHubRepository.getRepos(username);

  // Filter out forked repos and transform to DTOs
  return repos
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      id: String(repo.id),
      name: repo.name,
      description: repo.description,
      language: repo.language,
      starCount: repo.stargazers_count,
      updatedAt: repo.updated_at,
      htmlUrl: repo.html_url,
    }));
};
