// Re-export from react-i18next
export { useTranslation, Trans, I18nextProvider } from "react-i18next";

// Re-export from @/i18n
export {
  i18n,
  LANGUAGES,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_LABELS,
  LANGUAGE_STORAGE_KEY,
} from "@/i18n";
export type { Language } from "@/i18n";

// Re-export type-safe hooks and types
export { useTypedTranslation } from "./types";
export type { TranslationKey, TranslationNamespace } from "@/i18n/types";
