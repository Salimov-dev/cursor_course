"use client";

import { layoutConfig } from "@/config/layout.config";
import { siteConfig } from "@/config/site.config";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { useTranslation } from "react-i18next";

export const Logo = () => {
  return (
    <Image
      src="/logo_tatar_kitchen.png"
      alt={siteConfig.title}
      width={26}
      height={26}
      priority
    />
  );
};

export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const { isAuth, session, status, setAuthState } = useAuthStore();

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.error("error", error);
    }

    setAuthState("unauthenticated", null);
  };

  const getNavItems = () => {
    const navLabels: Record<string, string> = {
      "/": t("navigation:recipes"),
      "/ingredients": t("navigation:ingredients"),
      "/about": t("navigation:about")
    };

    return siteConfig.navItems
      .filter((item) => {
        if (item.href === "/ingredients") {
          return isAuth;
        }
        return true;
      })
      .map((item) => {
        const isActive = pathname === item.href;
        const label = navLabels[item.href] || item.label;

        return (
          <NavbarItem key={item.href}>
            <Link
              color="foreground"
              href={item.href}
              className={`px-3 py-1 
              ${isActive ? "text-blue-500" : "text-foreground"} 
              hover:text-blue-300 hover:border
              hover:border-blue-300 hover:rounded-md
              transition-colors
              transition-border
              duration-200`}
            >
              {label}
            </Link>
          </NavbarItem>
        );
      });
  };

  return (
    <Navbar style={{ height: layoutConfig.headerHeight }}>
      <NavbarBrand>
        <Link href="/" className="flex gap-1">
          <Logo />
          <p className="font-bold text-inherit">{t("branding:title")}</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {getNavItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <LanguageSwitcher />
        </NavbarItem>

        {isAuth && (
          <p>
            {t("common:hello")}, {session?.user?.email}!
          </p>
        )}

        {status === "loading" ? (
          <p>{t("common:loading")}</p>
        ) : !isAuth ? (
          <>
            <NavbarItem>
              <Button
                as={Link}
                color="secondary"
                href="#"
                variant="flat"
                onPress={() => setIsLoginOpen(true)}
              >
                {t("common:login")}
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onPress={() => setIsRegistrationOpen(true)}
              >
                {t("common:registration")}
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color="secondary"
              href="#"
              variant="flat"
              onPress={handleSignOut}
            >
              {t("common:signOut")}
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Navbar>
  );
}
