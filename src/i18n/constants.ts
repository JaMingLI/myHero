export const LANGUAGES = {
  EN: "en",
  ZH_TW: "zh-TW",
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export const DEFAULT_LANGUAGE: Language = LANGUAGES.EN;

export const SUPPORTED_LANGUAGES: Language[] = [LANGUAGES.EN, LANGUAGES.ZH_TW];
