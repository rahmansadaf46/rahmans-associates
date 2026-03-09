import { PrismaClient } from "@prisma/client";

import { defaultPromptTemplates } from "../src/lib/default-templates";

const prisma = new PrismaClient();

async function main() {
  for (const template of defaultPromptTemplates) {
    await prisma.promptTemplate.upsert({
      where: {
        slug: template.slug,
      },
      create: template,
      update: template,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Failed to seed prompt templates.", error);
    await prisma.$disconnect();
    process.exit(1);
  });
