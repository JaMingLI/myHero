import {
  useTranslation,
  SUPPORTED_LANGUAGES,
  LANGUAGE_LABELS,
  type Language,
} from "@/lib/i18n";

/**
 * Language switcher component that displays buttons for each supported language.
 * Uses i18n.changeLanguage() to switch languages, which automatically persists to localStorage.
 */
export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as Language;

  const handleLanguageChange = (language: Language) => {
    if (language !== currentLanguage) {
      i18n.changeLanguage(language);
    }
  };

  return (
    <div className="inline-flex items-center gap-1 bg-[var(--color-bg-secondary)] rounded-md p-0.5">
      {SUPPORTED_LANGUAGES.map((language) => {
        const isActive = currentLanguage === language;
        return (
          <button
            key={language}
            onClick={() => handleLanguageChange(language)}
            className={`
              px-2.5 py-1.5 text-xs font-medium rounded transition-colors
              ${
                isActive
                  ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }
            `}
            aria-label={`Switch to ${LANGUAGE_LABELS[language]}`}
            aria-pressed={isActive}
          >
            {LANGUAGE_LABELS[language]}
          </button>
        );
      })}
    </div>
  );
}
