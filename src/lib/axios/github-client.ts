import axios from "axios";
import { ENV } from "@/app/config";

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

// Request interceptor - add GitHub PAT if available
githubClient.interceptors.request.use(
  (config) => {
    if (ENV.GITHUB_TOKEN) {
      config.headers.Authorization = `token ${ENV.GITHUB_TOKEN}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
