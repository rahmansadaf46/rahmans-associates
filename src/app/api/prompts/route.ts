import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerI18n } from "@/lib/server-i18n";
import { getPromptRequestSchema } from "@/lib/validations/prompt";
import {
  AIServiceError,
  generateLegalPrompt,
  toPromptHistoryCreateInput,
} from "@/server/services/prompt-generation";

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
        error: (await getServerI18n()).t("validation.api.promptUnexpected"),
      },
      { status: 500 },
    );
  }
}
