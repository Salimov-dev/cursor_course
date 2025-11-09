"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/config/i18n";
import { loadResources } from "@/utils/i18n";
import { useI18nStore } from "@/store/i18n.store";
import { i18nConfig } from "@/config/i18n.config";

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const { currentLanguage, isInitialized, initialize } = useI18nStore();
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  useEffect(() => {
    const loadAllResources = async () => {
      if (typeof window === "undefined" || resourcesLoaded) {
        return;
      }

      try {
        const loadPromises = i18nConfig.supportedLanguages.map(async (lang) => {
          const translations = await loadResources(lang);
          
          if (translations.common) {
            i18n.addResourceBundle(lang, "common", translations.common, true, true);
          }
          if (translations.branding) {
            i18n.addResourceBundle(lang, "branding", translations.branding, true, true);
          }
          if (translations.navigation) {
            i18n.addResourceBundle(lang, "navigation", translations.navigation, true, true);
          }
          if (translations.recipes) {
            i18n.addResourceBundle(lang, "recipes", translations.recipes, true, true);
          }
        });

        await Promise.all(loadPromises);
        setResourcesLoaded(true);
      } catch (error) {
        console.error("Failed to load i18n resources:", error);
        setResourcesLoaded(true);
      }
    };

    loadAllResources();
  }, [resourcesLoaded]);

  useEffect(() => {
    if (isInitialized && resourcesLoaded && i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, isInitialized, resourcesLoaded]);

  if (!isInitialized || !resourcesLoaded) {
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

