import { prisma } from "@/lib/prisma";

export type DashboardPromptRecord = {
  id: string;
  inputRequest: string;
  generatedPrompt: string;
  category: string;
  promptType: string;
  desiredLanguage: string;
  tone: string;
  caseTitle: string | null;
  createdAt: string;
  isFavorite: boolean;
};

export async function getDashboardData(userId: string) {
  const promptHistory = await prisma.promptHistory.findMany({
    where: {
      userId,
    },
    include: {
      favorites: {
        where: {
          userId,
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const prompts: DashboardPromptRecord[] = promptHistory.map((item) => ({
    id: item.id,
    inputRequest: item.inputRequest,
    generatedPrompt: item.generatedPrompt,
    category: item.category,
    promptType: item.promptType,
    desiredLanguage: item.desiredLanguage,
    tone: item.tone,
    caseTitle: item.caseTitle,
    createdAt: item.createdAt.toISOString(),
    isFavorite: item.favorites.length > 0,
  }));

  return {
    prompts,
    favorites: prompts.filter((prompt) => prompt.isFavorite),
  };
}
