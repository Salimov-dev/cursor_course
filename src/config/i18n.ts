import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { SupportedLanguage } from "@/types/i18n";
import { i18nConfig } from "./i18n.config";

const resources: Record<
  SupportedLanguage,
  { common: any; branding: any; navigation: any; recipes: any }
> = {
  ru: { common: {}, branding: {}, navigation: {}, recipes: {} },
  en: { common: {}, branding: {}, navigation: {}, recipes: {} },
  ta: { common: {}, branding: {}, navigation: {}, recipes: {} }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: i18nConfig.defaultLanguage,
    fallbackLng: i18nConfig.fallbackLanguage,
    defaultNS: "common",
    ns: ["common", "branding", "navigation", "recipes"],
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;

