import { z } from "zod";

export const generationInsightsSchema = z.object({
  suggestedTitle: z.string().trim().min(6).max(90),
  summary: z.string().trim().min(16).max(220),
  nextSteps: z.array(z.string().trim().min(6).max(120)).min(2).max(4),
  suggestedTags: z.array(z.string().trim().min(2).max(24)).min(2).max(6),
});

export type GenerationInsights = z.infer<typeof generationInsightsSchema>;

export type GenerationStage = "preparing" | "drafting" | "enhancing" | "saving";

export type PromptStreamEvent =
  | {
      type: "status";
      stage: GenerationStage;
    }
  | {
      type: "chunk";
      text: string;
    }
  | {
      type: "complete";
      prompt: string;
      savedToHistory: boolean;
      insights: GenerationInsights | null;
    }
  | {
      type: "error";
      message: string;
      code?: string;
    };
