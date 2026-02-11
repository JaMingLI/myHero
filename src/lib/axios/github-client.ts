import axios from "axios";

/**
 * GitHub API Client
 * Direct access to GitHub's public API
 */
export const githubClient = axios.create({
  baseURL: "https://api.github.com",
  timeout: 10000,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});
