import {
  LegalCategory,
  PromptLanguage,
  PromptTone,
  PromptType,
} from "@prisma/client";
import { z } from "zod";

import { MAX_INPUT_LENGTHS } from "@/lib/constants";

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength, `Must be ${maxLength} characters or fewer.`)
    .optional()
    .or(z.literal(""));

export const promptRequestSchema = z.object({
  userRequest: z
    .string()
    .trim()
    .min(10, "Describe the legal task in at least 10 characters.")
    .max(
      MAX_INPUT_LENGTHS.userRequest,
      `Request must be ${MAX_INPUT_LENGTHS.userRequest} characters or fewer.`,
    ),
  category: z.nativeEnum(LegalCategory),
  promptType: z.nativeEnum(PromptType),
  caseTitle: optionalText(MAX_INPUT_LENGTHS.caseTitle),
  facts: optionalText(MAX_INPUT_LENGTHS.facts),
  relevantLaw: optionalText(MAX_INPUT_LENGTHS.relevantLaw),
  courtName: optionalText(MAX_INPUT_LENGTHS.courtName),
  desiredLanguage: z.nativeEnum(PromptLanguage),
  tone: z.nativeEnum(PromptTone),
});

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
