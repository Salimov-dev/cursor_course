"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { I18nStore, SupportedLanguage } from "@/types/i18n";
import { i18nConfig } from "@/config/i18n.config";

export const useI18nStore = create<I18nStore>()(
  persist(
    (set, get) => ({
      currentLanguage: i18nConfig.defaultLanguage,
      isInitialized: false,
      setLanguage: (language: SupportedLanguage) => {
        if (i18nConfig.supportedLanguages.includes(language)) {
          set({ currentLanguage: language });
        }
      },
      initialize: async () => {
        if (typeof window === "undefined") {
          return;
        }

        try {
          const state = get();
          const language = state.currentLanguage;

          if (
            language &&
            i18nConfig.supportedLanguages.includes(language)
          ) {
            set({ isInitialized: true });
          } else {
            set({
              currentLanguage: i18nConfig.defaultLanguage,
              isInitialized: true
            });
          }
        } catch (error) {
          console.error("Failed to initialize i18n:", error);
          set({
            currentLanguage: i18nConfig.defaultLanguage,
            isInitialized: true
          });
        }
      }
    }),
    {
      name: "i18n-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currentLanguage: state.currentLanguage }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const language = state.currentLanguage;
          if (
            language &&
            i18nConfig.supportedLanguages.includes(language)
          ) {
            state.isInitialized = true;
          } else {
            state.currentLanguage = i18nConfig.defaultLanguage;
            state.isInitialized = true;
          }
        }
      }
    }
  )
);

