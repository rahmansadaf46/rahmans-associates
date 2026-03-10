import { z } from "zod";

import { createTranslator, messageCatalogs, type Locale, type TranslateFn } from "@/lib/i18n";

export function getLoginSchema(t: TranslateFn) {
  return z.object({
    email: z.email(t("validation.auth.validEmail")).trim().toLowerCase(),
    password: z.string().min(8, t("validation.auth.passwordMin")),
  });
}

export function getRegisterSchema(t: TranslateFn) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, t("validation.auth.nameMin"))
      .max(80, t("validation.auth.nameMax")),
    email: z.email(t("validation.auth.validEmail")).trim().toLowerCase(),
    password: z
      .string()
      .min(8, t("validation.auth.passwordMin"))
      .max(128, t("validation.auth.passwordMax")),
  });
}

function getDefaultTranslator(locale: Locale = "en") {
  return createTranslator(locale, messageCatalogs[locale]).t;
}

export const loginSchema = getLoginSchema(getDefaultTranslator());
export const registerSchema = getRegisterSchema(getDefaultTranslator());

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
