import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/layout/header";
import { Providers } from "@/providers/provider";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";
import AppLoader from "@/hoc/app-loader";
import Title from "@/components/UI/layout/title";
import { LanguageUpdater } from "@/components/common/language-updater";
import { i18nConfig } from "@/config/i18n.config";
import Footer from "@/components/common/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang={i18nConfig.defaultLanguage}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LanguageUpdater />
          <SessionProvider session={session}>
            <AppLoader>
              <div className="flex min-h-screen flex-col justify-between">
                <div className="flex flex-col">
                  <Header />
                  <main
                    className={`flex flex-col max-w-[1024px] mx-auto px-[24px] justify-start items-center`}
                  >
                    <Title />
                    {children}
                  </main>
                </div>

                <Footer />
              </div>
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
