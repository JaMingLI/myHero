import type { EnvConfig } from "./env.type";
import { GITHUB_TOKEN } from "./secrets.local";

const config: EnvConfig = {
  VITE_API_URL: "https://dev-api.example.com",
  VITE_ENV: "development",
  VITE_GITHUB_USERNAME: "JaMingLI",
  VITE_GITHUB_TOKEN: GITHUB_TOKEN,
};

export default config;
