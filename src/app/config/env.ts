export const ENV = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  API_URL: import.meta.env.VITE_API_URL,
  ENV: import.meta.env.VITE_ENV,
  IS_DEV: import.meta.env.VITE_ENV === "development",
  IS_PROD: import.meta.env.MODE === "production",
  GITHUB_USERNAME: import.meta.env.VITE_GITHUB_USERNAME || "JaMingLI",
} as const;
