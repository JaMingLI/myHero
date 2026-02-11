import { githubClient } from "@/lib/axios";

/**
 * GitHub API Response Types (Internal to Domain)
 */
export interface GitHubRepoResp {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  fork: boolean;
}

export interface GitHubEventResp {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  payload: {
    ref?: string;
    ref_type?: string;
    commits?: Array<{ message: string }>;
    action?: string;
    pull_request?: { title: string };
    issue?: { title: string };
  };
  created_at: string;
}

/**
 * GitHub Repository
 * Handles direct API communication with GitHub
 */
export const GitHubRepository = {
  /**
   * Get repositories for authenticated user (includes private repos)
   */
  async getRepos(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _username: string
  ): Promise<GitHubRepoResp[]> {
    const { data } = await githubClient.get<GitHubRepoResp[]>("/user/repos", {
      params: {
        sort: "updated",
        per_page: 6,
        affiliation: "owner",
      },
    });
    return data;
  },

  /**
   * Get events for a user (includes private repo events when authenticated)
   */
  async getEvents(username: string): Promise<GitHubEventResp[]> {
    const { data } = await githubClient.get<GitHubEventResp[]>(
      `/users/${username}/events`,
      {
        params: {
          per_page: 10,
        },
      }
    );
    return data;
  },
};
