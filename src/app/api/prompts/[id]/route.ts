import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerI18n } from "@/lib/server-i18n";

type PromptRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_: Request, { params }: PromptRouteProps) {
  const { t } = await getServerI18n();
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: t("validation.api.unauthorized") }, { status: 401 });
  }

  const { id } = await params;

  const prompt = await prisma.promptHistory.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    select: {
      id: true,
    },
  });

  if (!prompt) {
    return NextResponse.json({ error: t("validation.api.promptNotFound") }, { status: 404 });
  }

  await prisma.promptHistory.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard");
  return NextResponse.json({ success: true });
}
