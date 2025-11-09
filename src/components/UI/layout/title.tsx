"use client";

import { siteConfig } from "@/config/site.config";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const Title = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const currentNavItem = siteConfig.navItems.find(
    (item) => item.href === pathname
  );

  let pageTitle: string;
  if (currentNavItem) {
    const navLabels: Record<string, string> = {
      "/": t("navigation:recipes"),
      "/ingredients": t("navigation:ingredients"),
      "/about": t("navigation:about")
    };
    pageTitle = navLabels[currentNavItem.href] || currentNavItem.label;
  } else {
    pageTitle = t("branding:title");
  }

  return (
    <div className="w-full flex justify-center my-6">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
    </div>
  );
};

export default Title;
