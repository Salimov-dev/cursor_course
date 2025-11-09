export type SupportedLanguage = "ru" | "en" | "ta";

export interface I18nConfig {
  defaultLanguage: SupportedLanguage;
  supportedLanguages: SupportedLanguage[];
  fallbackLanguage: SupportedLanguage;
}

export interface I18nStore {
  currentLanguage: SupportedLanguage;
  isInitialized: boolean;
  setLanguage: (language: SupportedLanguage) => void;
  initialize: () => Promise<void>;
}

