// Barrel export for lib layer
export { apiClient } from "./axios";
export { useQuery, useMutation, useQueryClient, QUERY_KEYS } from "./react-query";
export { z } from "./zod";
export { useForm, zodResolver } from "./react-hook-form";
export { cn } from "./utils";

// i18n exports
export {
  useTranslation,
  useTypedTranslation,
  Trans,
  I18nextProvider,
  i18n,
  LANGUAGES,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_LABELS,
  LANGUAGE_STORAGE_KEY,
} from "./i18n";
export type { Language, TranslationKey, TranslationNamespace } from "./i18n";
