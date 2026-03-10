import { cookies } from "next/headers";

import {
  LOCALE_COOKIE_NAME,
  createTranslator,
  messageCatalogs,
  resolveLocale,
  type Locale,
} from "@/lib/i18n";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return resolveLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
}

export async function getServerI18n(forceLocale?: Locale) {
  const locale = forceLocale ?? (await getServerLocale());
  return createTranslator(locale, messageCatalogs[locale]);
}
