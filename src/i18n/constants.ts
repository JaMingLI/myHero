export const LANGUAGES = {
  EN: "en",
  ZH_TW: "zh-TW",
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export const DEFAULT_LANGUAGE: Language = LANGUAGES.EN;

export const SUPPORTED_LANGUAGES: Language[] = [LANGUAGES.EN, LANGUAGES.ZH_TW];

/**
 * Human-readable labels for each supported language.
 */
export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "EN",
  "zh-TW": "中文",
};

/**
 * localStorage key for persisting the user's language preference.
 */
export const LANGUAGE_STORAGE_KEY = "app-language";
