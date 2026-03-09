import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  Noto_Sans_Bengali,
} from "next/font/google";

import { BRAND_NAME } from "@/lib/constants";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { auth } from "@/lib/auth";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
  title: {
    default: BRAND_NAME,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Rahman's Associate is a premium legal-tech platform for advocates in Bangladesh to generate structured AI prompts for drafting, research, notices, petitions, agreements, and case preparation.",
  keywords: [
    "Bangladesh legal tech",
    "AI prompt generator",
    "advocate prompt tool",
    "Bangla legal drafting",
    "Next.js Prisma OpenAI",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${bengali.variable} antialiased`}>
        <Providers session={session}>
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
