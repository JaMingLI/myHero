import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants";

import en from "./locales/en.json";
import zhTW from "./locales/zh-TW.json";

const resources = {
  en: { translation: en },
  "zh-TW": { translation: zhTW },
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
export { LANGUAGES, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants";
export type { Language } from "./constants";
