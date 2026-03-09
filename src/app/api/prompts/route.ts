import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { promptRequestSchema } from "@/lib/validations/prompt";
import {
  AIServiceError,
  generateLegalPrompt,
  toPromptHistoryCreateInput,
} from "@/server/services/prompt-generation";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const body = await request.json();
    const parsed = promptRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message ?? "Invalid prompt request.",
        },
        { status: 422 },
      );
    }

    const { generatedPrompt, payload } = await generateLegalPrompt(parsed.data);

    let savedToHistory = false;

    if (session?.user?.id) {
      await prisma.promptHistory.create({
        data: toPromptHistoryCreateInput(session.user.id, payload, generatedPrompt),
      });

      savedToHistory = true;
      revalidatePath("/dashboard");
    }

    return NextResponse.json({
      prompt: generatedPrompt,
      savedToHistory,
    });
  } catch (error) {
    if (error instanceof AIServiceError) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
        },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      {
        error: "Prompt generation failed due to an unexpected server error.",
      },
      { status: 500 },
    );
  }
}
