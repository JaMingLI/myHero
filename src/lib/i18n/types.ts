import { useTranslation } from "react-i18next";
import type { TranslationKey } from "@/i18n/types";

/**
 * A type-safe translation hook that provides autocomplete for translation keys.
 * Wraps react-i18next's useTranslation with strict typing.
 */
export function useTypedTranslation() {
  const { t, i18n, ready } = useTranslation();

  /**
   * Type-safe translation function.
   * @param key - A valid translation key (e.g., "common.loading")
   * @param options - Optional interpolation values
   */
  const typedT = (
    key: TranslationKey,
    options?: Record<string, unknown>
  ): string => {
    return t(key, options);
  };

  return { t: typedT, i18n, ready };
}
