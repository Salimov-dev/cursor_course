import { I18nConfig, SupportedLanguage } from "@/types/i18n";

export const i18nConfig: I18nConfig = {
  defaultLanguage: "ru",
  supportedLanguages: ["ru", "en", "ta"],
  fallbackLanguage: "ru"
} as const;

export const getLanguageName = (lang: SupportedLanguage): string => {
  const names: Record<SupportedLanguage, string> = {
    ru: "Русский",
    en: "English",
    ta: "Татарча"
  };
  return names[lang];
};

export const getLanguageCode = (lang: SupportedLanguage): string => {
  return lang;
};

