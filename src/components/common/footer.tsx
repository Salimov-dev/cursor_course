"use client";

import { useTranslation } from "react-i18next";
import { layoutConfig } from "@/config/layout.config";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className={`w-full flex items-center justify-center py-3`}
      style={{ height: layoutConfig.footerHeight }}
    >
      <p>{t("branding:description")}</p>
    </footer>
  );
}

