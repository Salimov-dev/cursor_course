"use client";

import { useEffect } from "react";
import { useI18nStore } from "@/store/i18n.store";

export function LanguageUpdater() {
  const { currentLanguage } = useI18nStore();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  return null;
}

