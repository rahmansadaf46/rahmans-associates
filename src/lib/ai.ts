import { GoogleGenAI } from "@google/genai";
import { PromptLanguage } from "@prisma/client";
import { zodToJsonSchema } from "zod-to-json-schema";

import { generationInsightsSchema, type GenerationInsights } from "@/lib/ai-contract";

let cachedClient: GoogleGenAI | null = null;

export const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

type StreamTextParams = {
  abortAfterMs?: number;
  onChunk: (chunk: string) => void;
  prompt: string;
  systemInstruction: string;
  temperature?: number;
};

type InsightsParams = {
  abortAfterMs?: number;
  desiredLanguage: PromptLanguage;
  generatedText: string;
};

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string) {
  return Promise.race<T>([
    promise,
    new Promise<T>((_, reject) => {
      const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        reject(new Error(message));
      }, timeoutMs);
    }),
  ]);
}

function toGeminiJsonSchema() {
  const schema = zodToJsonSchema(
    generationInsightsSchema as unknown as Parameters<typeof zodToJsonSchema>[0],
    "GenerationInsights",
  );

  if (schema && typeof schema === "object" && "$schema" in schema) {
    delete (schema as Record<string, unknown>).$schema;
  }

  return schema;
}

function getInsightsLanguageInstruction(desiredLanguage: PromptLanguage) {
  if (desiredLanguage === PromptLanguage.BANGLA) {
    return "Write every field in Bangla.";
  }

  if (desiredLanguage === PromptLanguage.BILINGUAL) {
    return "Write every field in clear Bangla with important English legal terms where useful.";
  }

  return "Write every field in English.";
}

export function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  if (!cachedClient) {
    cachedClient = new GoogleGenAI({ apiKey });
  }

  return cachedClient;
}

export async function streamDraftText({
  abortAfterMs = 45_000,
  onChunk,
  prompt,
  systemInstruction,
  temperature = 0.35,
}: StreamTextParams) {
  const generation = withTimeout(
    getAIClient().models.generateContentStream({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction,
        temperature,
        maxOutputTokens: 3_072,
      },
    }),
    abortAfterMs,
    "The drafting service took too long to respond.",
  );

  let generatedText = "";
  const stream = await generation;

  for await (const chunk of stream) {
    const text = chunk.text;

    if (!text) {
      continue;
    }

    generatedText += text;
    onChunk(text);
  }

  return generatedText.trim();
}

export async function generateDraftInsights({
  abortAfterMs = 12_000,
  desiredLanguage,
  generatedText,
}: InsightsParams): Promise<GenerationInsights | null> {
  if (!generatedText.trim()) {
    return null;
  }

  try {
    const response = await withTimeout(
      getAIClient().models.generateContent({
        model: GEMINI_MODEL,
        contents: [
          "Read the legal work product below and return only JSON that matches the schema.",
          "Keep the suggested title practical and chamber-friendly.",
          "Keep the summary short and useful for a busy advocate.",
          "Make the next steps specific and review-oriented.",
          getInsightsLanguageInstruction(desiredLanguage),
          "",
          generatedText,
        ].join("\n"),
        config: {
          temperature: 0.2,
          responseMimeType: "application/json",
          responseJsonSchema: toGeminiJsonSchema(),
        },
      }),
      abortAfterMs,
      "The drafting summary took too long to respond.",
    );

    const rawText = response.text?.trim();

    if (!rawText) {
      return null;
    }

    const parsed = JSON.parse(rawText) as unknown;
    return generationInsightsSchema.parse(parsed);
  } catch {
    return null;
  }
}
