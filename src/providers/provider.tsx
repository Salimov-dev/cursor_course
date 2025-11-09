"use client";

import { HeroUIProvider } from "@heroui/react";
import { I18nProvider } from "./i18n.provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <I18nProvider>{children}</I18nProvider>
    </HeroUIProvider>
  );
}
