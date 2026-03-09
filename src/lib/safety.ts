import { PromptLanguage } from "@prisma/client";

const BANGLA_REGEX = /[\u0980-\u09FF]/;
const LATIN_REGEX = /[A-Za-z]/;
const CONTROL_CHAR_REGEX = /[\u0000-\u001F\u007F-\u009F]/g;
const ZERO_WIDTH_REGEX = /[\u200B-\u200D\uFEFF]/g;
const HTML_TAG_REGEX = /<[^>]*>/g;

function normalizeWhitespace(value: string) {
  return value.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function sanitizeSingleLine(value?: string | null, maxLength = 160) {
  if (!value) {
    return null;
  }

  const sanitized = value
    .replace(HTML_TAG_REGEX, " ")
    .replace(CONTROL_CHAR_REGEX, " ")
    .replace(ZERO_WIDTH_REGEX, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

  return sanitized || null;
}

export function sanitizeMultiline(value?: string | null, maxLength = 1000) {
  if (!value) {
    return null;
  }

  const sanitized = normalizeWhitespace(
    value
      .replace(HTML_TAG_REGEX, " ")
      .replace(CONTROL_CHAR_REGEX, " ")
      .replace(ZERO_WIDTH_REGEX, "")
      .slice(0, maxLength),
  );

  return sanitized || null;
}

export function detectInputLanguage(value: string): PromptLanguage {
  const hasBangla = BANGLA_REGEX.test(value);
  const hasLatin = LATIN_REGEX.test(value);

  if (hasBangla && hasLatin) {
    return PromptLanguage.BILINGUAL;
  }

  if (hasBangla) {
    return PromptLanguage.BANGLA;
  }

  return PromptLanguage.ENGLISH;
}
