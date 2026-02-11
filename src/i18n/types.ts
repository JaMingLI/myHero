import type en from "./locales/en.json";

/**
 * Recursively extracts all nested keys from a translation object.
 * Produces dot-notation keys like "common.loading", "auth.login", etc.
 */
type NestedKeys<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? NestedKeys<T[K], Prefix extends "" ? K : `${Prefix}.${K}`>
          : Prefix extends ""
            ? K
            : `${Prefix}.${K}`
        : never;
    }[keyof T]
  : never;

/**
 * Type-safe translation key based on the English locale file structure.
 * Provides autocomplete for all valid translation keys.
 */
export type TranslationKey = NestedKeys<typeof en>;

/**
 * Available translation namespaces (top-level keys in the locale file).
 */
export type TranslationNamespace = keyof typeof en;
