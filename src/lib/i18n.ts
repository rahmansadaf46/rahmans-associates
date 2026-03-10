import en from "@/messages/en.json";
import bn from "@/messages/bn.json";

export const locales = ["en", "bn"] as const;
export type Locale = (typeof locales)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE_NAME = "ra-locale";

export type Messages = typeof en;
export type TranslateValues = Record<string, number | string>;
export type TranslateFn = (key: string, values?: TranslateValues) => string;

export const messageCatalogs: Record<Locale, Messages> = {
  en,
  bn,
};

export function resolveLocale(value?: string | null): Locale {
  return value === "bn" ? "bn" : DEFAULT_LOCALE;
}

export function getMessage(messages: Messages, key: string): unknown {
  return key.split(".").reduce<unknown>((current, part) => {
    if (
      current &&
      typeof current === "object" &&
      part in (current as Record<string, unknown>)
    ) {
      return (current as Record<string, unknown>)[part];
    }

    return undefined;
  }, messages);
}

function interpolate(template: string, values?: TranslateValues) {
  if (!values) {
    return template;
  }

  return template.replace(/\{\{(.*?)\}\}/g, (_, rawKey: string) => {
    const key = rawKey.trim();
    return String(values[key] ?? "");
  });
}

export function createTranslator(locale: Locale, messages: Messages) {
  const t: TranslateFn = (key, values) => {
    const value = getMessage(messages, key);

    if (typeof value !== "string") {
      return key;
    }

    return interpolate(value, values);
  };

  return {
    locale,
    messages,
    t,
  };
}
