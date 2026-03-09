import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type FavoriteRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(_: Request, { params }: FavoriteRouteProps) {
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

  const existingFavorite = await prisma.favoritePrompt.findUnique({
    where: {
      userId_promptHistoryId: {
        userId: session.user.id,
        promptHistoryId: id,
      },
    },
  });

  let isFavorite = false;

  if (existingFavorite) {
    await prisma.favoritePrompt.delete({
      where: {
        userId_promptHistoryId: {
          userId: session.user.id,
          promptHistoryId: id,
        },
      },
    });
  } else {
    await prisma.favoritePrompt.create({
      data: {
        userId: session.user.id,
        promptHistoryId: id,
      },
    });
    isFavorite = true;
  }

  revalidatePath("/dashboard");

  return NextResponse.json({ isFavorite });
}
