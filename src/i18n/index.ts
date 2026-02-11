import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  LANGUAGE_STORAGE_KEY,
} from "./constants";
import type { Language } from "./constants";

import en from "./locales/en.json";
import zhTW from "./locales/zh-TW.json";

const resources = {
  en: { translation: en },
  "zh-TW": { translation: zhTW },
};

/**
 * Determines the initial language based on:
 * 1. localStorage preference (if valid)
 * 2. Browser language (if supported)
 * 3. Default language fallback
 */
function getInitialLanguage(): Language {
  // Check localStorage first
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored as Language)) {
    return stored as Language;
  }

  // Check browser language
  const browserLang = navigator.language;
  if (SUPPORTED_LANGUAGES.includes(browserLang as Language)) {
    return browserLang as Language;
  }

  // Check browser language prefix (e.g., "zh" for "zh-CN")
  const browserLangPrefix = browserLang.split("-")[0];
  const matchedLang = SUPPORTED_LANGUAGES.find((lang) =>
    lang.startsWith(browserLangPrefix)
  );
  if (matchedLang) {
    return matchedLang;
  }

  return DEFAULT_LANGUAGE;
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: {
    escapeValue: false,
  },
});

// Persist language changes to localStorage
i18n.on("languageChanged", (lng: string) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
});

export { i18n };
export {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  LANGUAGE_LABELS,
  LANGUAGE_STORAGE_KEY,
} from "./constants";
export type { Language } from "./constants";
