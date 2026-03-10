import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import type { PromptStreamEvent } from "@/lib/ai-contract";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerI18n } from "@/lib/server-i18n";
import { getPromptRequestSchema } from "@/lib/validations/prompt";
import {
  AIServiceError,
  generatePromptInsights,
  streamLegalPrompt,
  toPromptHistoryCreateInput,
} from "@/server/services/prompt-generation";

const streamHeaders = {
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
  "Content-Type": "application/x-ndjson; charset=utf-8",
  "X-Accel-Buffering": "no",
} as const;

function encodeEvent(event: PromptStreamEvent) {
  return `${JSON.stringify(event)}\n`;
}

export async function POST(request: Request) {
  try {
    const { t } = await getServerI18n();
    const session = await auth();
    const body = await request.json();
    const parsed = getPromptRequestSchema(t).safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message ?? t("validation.prompt.invalidRequest"),
        },
        { status: 422 },
      );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const send = (event: PromptStreamEvent) => {
          controller.enqueue(encoder.encode(encodeEvent(event)));
        };

        try {
          send({ type: "status", stage: "preparing" });
          send({ type: "status", stage: "drafting" });

          const { generatedPrompt, payload } = await streamLegalPrompt(parsed.data, {
            onChunk(chunk) {
              send({ type: "chunk", text: chunk });
            },
          });

          send({ type: "status", stage: "enhancing" });
          const insights = await generatePromptInsights(
            generatedPrompt,
            payload.desiredLanguage,
          );

          let savedToHistory = false;

          if (session?.user?.id) {
            send({ type: "status", stage: "saving" });

            try {
              await prisma.promptHistory.create({
                data: toPromptHistoryCreateInput(
                  session.user.id,
                  payload,
                  generatedPrompt,
                ),
              });

              savedToHistory = true;
              revalidatePath("/dashboard");
            } catch {
              savedToHistory = false;
            }
          }

          send({
            type: "complete",
            prompt: generatedPrompt,
            savedToHistory,
            insights,
          });
        } catch (error) {
          const normalized =
            error instanceof AIServiceError
              ? error
              : new AIServiceError(
                  (await getServerI18n()).t("validation.api.promptUnexpected"),
                );

          send({
            type: "error",
            message: normalized.message,
            code: normalized.code,
          });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: streamHeaders,
    });
  } catch {
    return NextResponse.json(
      {
        error: (await getServerI18n()).t("validation.api.promptUnexpected"),
      },
      { status: 500 },
    );
  }
}
