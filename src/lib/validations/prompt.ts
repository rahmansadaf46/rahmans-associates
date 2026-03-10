import {
  LegalCategory,
  PromptLanguage,
  PromptTone,
  PromptType,
} from "@prisma/client";
import { z } from "zod";

import { createTranslator, messageCatalogs, type Locale, type TranslateFn } from "@/lib/i18n";
import { MAX_INPUT_LENGTHS } from "@/lib/constants";

const optionalText = (maxLength: number, t: TranslateFn) =>
  z
    .string()
    .trim()
    .max(maxLength, t("validation.prompt.optionalMax", { count: maxLength }))
    .optional()
    .or(z.literal(""));

export function getPromptRequestSchema(t: TranslateFn) {
  return z.object({
    userRequest: z
      .string()
      .trim()
      .min(10, t("validation.prompt.requestMin"))
      .max(
        MAX_INPUT_LENGTHS.userRequest,
        t("validation.prompt.requestMax", {
          count: MAX_INPUT_LENGTHS.userRequest,
        }),
      ),
    category: z.nativeEnum(LegalCategory),
    promptType: z.nativeEnum(PromptType),
    caseTitle: optionalText(MAX_INPUT_LENGTHS.caseTitle, t),
    facts: optionalText(MAX_INPUT_LENGTHS.facts, t),
    relevantLaw: optionalText(MAX_INPUT_LENGTHS.relevantLaw, t),
    courtName: optionalText(MAX_INPUT_LENGTHS.courtName, t),
    desiredLanguage: z.nativeEnum(PromptLanguage),
    tone: z.nativeEnum(PromptTone),
  });
}

function getDefaultTranslator(locale: Locale = "en") {
  return createTranslator(locale, messageCatalogs[locale]).t;
}

export const promptRequestSchema = getPromptRequestSchema(getDefaultTranslator());

export type PromptRequestValues = z.infer<typeof promptRequestSchema>;

export const promptFormDefaults: PromptRequestValues = {
  userRequest: "",
  category: LegalCategory.CRIMINAL_LAW,
  promptType: PromptType.DRAFTING,
  caseTitle: "",
  facts: "",
  relevantLaw: "",
  courtName: "",
  desiredLanguage: PromptLanguage.ENGLISH,
  tone: PromptTone.FORMAL,
};
