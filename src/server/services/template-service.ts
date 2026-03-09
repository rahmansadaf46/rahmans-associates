import { PromptTemplate } from "@prisma/client";

import { defaultPromptTemplates } from "@/lib/default-templates";
import { prisma } from "@/lib/prisma";

export type TemplateRecord = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: PromptTemplate["category"];
  promptType: PromptTemplate["promptType"];
  language: PromptTemplate["language"];
  promptBody: string;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

function serializeTemplate(template: PromptTemplate): TemplateRecord {
  return {
    ...template,
    createdAt: template.createdAt.toISOString(),
    updatedAt: template.updatedAt.toISOString(),
  };
}

function serializeDefaultTemplate(index: number): TemplateRecord {
  const template = defaultPromptTemplates[index];
  const fallbackDate = new Date("2026-01-01T00:00:00.000Z").toISOString();

  return {
    id: `default-template-${index + 1}`,
    title: template.title,
    slug: template.slug,
    description: template.description,
    category: template.category,
    promptType: template.promptType,
    language: template.language ?? "ENGLISH",
    promptBody: template.promptBody,
    tags: template.tags,
    isFeatured: template.isFeatured ?? false,
    isPublished: template.isPublished ?? true,
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  };
}

function getDefaultTemplates() {
  return defaultPromptTemplates.map((_, index) => serializeDefaultTemplate(index));
}

export async function getPublishedTemplates() {
  if (!process.env.DATABASE_URL) {
    return getDefaultTemplates();
  }

  try {
    const templates = await prisma.promptTemplate.findMany({
      where: {
        isPublished: true,
      },
      orderBy: [{ isFeatured: "desc" }, { title: "asc" }],
    });

    return templates.map(serializeTemplate);
  } catch {
    return getDefaultTemplates();
  }
}

export async function getFeaturedTemplates(limit = 3) {
  const templates = await getPublishedTemplates();
  return templates.filter((template) => template.isFeatured).slice(0, limit);
}

export async function getTemplateBySlug(slug: string) {
  if (!process.env.DATABASE_URL) {
    const index = defaultPromptTemplates.findIndex((template) => template.slug === slug);
    return index >= 0 ? serializeDefaultTemplate(index) : null;
  }

  try {
    const template = await prisma.promptTemplate.findUnique({
      where: {
        slug,
      },
    });

    if (!template) {
      return null;
    }

    return serializeTemplate(template);
  } catch {
    const index = defaultPromptTemplates.findIndex((template) => template.slug === slug);
    return index >= 0 ? serializeDefaultTemplate(index) : null;
  }
}
