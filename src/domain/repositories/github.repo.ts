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
   * Get public repositories for a user
   */
  async getRepos(username: string): Promise<GitHubRepoResp[]> {
    const { data } = await githubClient.get<GitHubRepoResp[]>(
      `/users/${username}/repos`,
      {
        params: {
          sort: "updated",
          per_page: 6,
        },
      }
    );
    return data;
  },

  /**
   * Get public events for a user
   */
  async getEvents(username: string): Promise<GitHubEventResp[]> {
    const { data } = await githubClient.get<GitHubEventResp[]>(
      `/users/${username}/events/public`,
      {
        params: {
          per_page: 10,
        },
      }
    );
    return data;
  },
};
