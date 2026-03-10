"use client";

import {
  createContext,
  useContext,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";

import {
  LOCALE_COOKIE_NAME,
  createTranslator,
  type Locale,
  type Messages,
} from "@/lib/i18n";

type I18nContextValue = {
  isSwitching: boolean;
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof createTranslator>["t"];
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: Locale;
  messages: Messages;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function setLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      return;
    }

    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  }

  const translator = createTranslator(locale, messages);

  return (
    <I18nContext.Provider
      value={{
        isSwitching: isPending,
        locale,
        messages,
        setLocale,
        t: translator.t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider.");
  }

  return context;
}

export function useTranslations() {
  return useI18n().t;
}
