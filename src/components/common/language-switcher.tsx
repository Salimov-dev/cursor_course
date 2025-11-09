"use client";

import { useI18nStore } from "@/store/i18n.store";
import { i18nConfig, getLanguageName } from "@/config/i18n.config";
import { SupportedLanguage } from "@/types/i18n";
import { Select, SelectItem } from "@heroui/react";

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useI18nStore();

  return (
    <Select
      size="sm"
      selectedKeys={[currentLanguage]}
      onSelectionChange={(keys) => {
        const selectedKey = Array.from(keys)[0] as SupportedLanguage;
        if (selectedKey && i18nConfig.supportedLanguages.includes(selectedKey)) {
          setLanguage(selectedKey);
        }
      }}
      classNames={{
        trigger: "bg-default-100 min-w-[120px]",
        innerWrapper: "text-sm",
        value: "truncate",
        popoverContent: "[&_*]:text-black"
      }}
      aria-label="Выбор языка"
    >
      {i18nConfig.supportedLanguages.map((lang) => (
        <SelectItem key={lang} className="text-black">
          {getLanguageName(lang)}
        </SelectItem>
      ))}
    </Select>
  );
}

