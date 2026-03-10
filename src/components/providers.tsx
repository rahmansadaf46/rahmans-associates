"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import { I18nProvider } from "@/components/i18n-provider";
import type { Locale, Messages } from "@/lib/i18n";

export function Providers({
  children,
  locale,
  messages,
  session,
}: {
  children: React.ReactNode;
  locale: Locale;
  messages: Messages;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <I18nProvider locale={locale} messages={messages}>
        {children}
        <Toaster
          richColors
          position="top-right"
          theme="dark"
          toastOptions={{
            className:
              "border border-white/10 bg-[rgba(7,10,18,0.92)] text-[color:var(--text-strong)] shadow-[0_22px_80px_rgba(0,0,0,0.45)]",
          }}
        />
      </I18nProvider>
    </SessionProvider>
  );
}
