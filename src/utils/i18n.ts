import { SupportedLanguage } from "@/types/i18n";

const translationFiles = [
  "common",
  "branding",
  "navigation",
  "recipes"
] as const;

export const loadResources = async (
  language: SupportedLanguage
): Promise<Record<string, any>> => {
  const resources: Record<string, any> = {};

  for (const file of translationFiles) {
    try {
      const response = await fetch(`/locales/${language}/${file}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${language}/${file} translations`);
      }
      const data = await response.json();
      Object.assign(resources, data);
    } catch (error) {
      console.error(`Error loading translations for ${language}/${file}:`, error);
    }
  }

  return resources;
};

