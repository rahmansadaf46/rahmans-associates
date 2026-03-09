import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type PromptRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_: Request, { params }: PromptRouteProps) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
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
    return NextResponse.json({ error: "Prompt not found." }, { status: 404 });
  }

  await prisma.promptHistory.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard");
  return NextResponse.json({ success: true });
}
