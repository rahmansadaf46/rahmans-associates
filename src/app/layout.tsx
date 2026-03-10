import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  Noto_Sans_Bengali,
} from "next/font/google";

import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { auth } from "@/lib/auth";
import { getServerI18n } from "@/lib/server-i18n";

import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { messages, t } = await getServerI18n();
  const keywords = messages.meta.keywords;

  return {
    metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
    title: {
      default: t("brand.name"),
      template: `%s | ${t("brand.name")}`,
    },
    description: t("meta.rootDescription"),
    keywords: Array.isArray(keywords) ? keywords : [],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const { locale, messages } = await getServerI18n();

  return (
    <html lang={locale}>
      <body
        className={`${sans.variable} ${serif.variable} ${bengali.variable} antialiased`}
      >
        <Providers locale={locale} messages={messages} session={session}>
          <div className="flex min-h-screen flex-col">
            <SiteHeader session={session} />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
