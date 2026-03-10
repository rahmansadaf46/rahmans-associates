import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/ui/copy-button";
import { buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getLegalCategoryLabels,
  getPromptLanguageLabels,
  getPromptTypeLabels,
} from "@/lib/prompt-options";
import { getServerI18n } from "@/lib/server-i18n";
import { localizeTemplateRecord } from "@/lib/template-localizations";
import { getTemplateBySlug } from "@/server/services/template-service";

type TemplateDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: TemplateDetailsPageProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  const { locale, t } = await getServerI18n();

  if (!template) {
    return {
      title: t("meta.templateNotFoundTitle"),
    };
  }

  return {
    title: localizeTemplateRecord(template, locale).title,
    description: localizeTemplateRecord(template, locale).description,
  };
}

export default async function TemplateDetailsPage({
  params,
}: TemplateDetailsPageProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);
  const { locale, t } = await getServerI18n();

  if (!template) {
    notFound();
  }

  const localizedTemplate = localizeTemplateRecord(template, locale);

  const legalCategoryLabels = getLegalCategoryLabels(t);
  const promptTypeLabels = getPromptTypeLabels(t);
  const promptLanguageLabels = getPromptLanguageLabels(t);

  return (
    <div className="px-6 py-16 sm:py-20">
      <div className="page-shell space-y-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {t("brand.name")} •{" "}
            {legalCategoryLabels[localizedTemplate.category]} •{" "}
            {promptTypeLabels[localizedTemplate.promptType]} •{" "}
            {promptLanguageLabels[localizedTemplate.language]}
          </p>
          <h1 className="max-w-4xl font-[family:var(--font-serif)] text-5xl leading-tight text-[color:var(--text-strong)]">
            {localizedTemplate.title}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
            {localizedTemplate.description}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("templates.promptTitle")}</CardTitle>
            <CardDescription>
              {t("templates.promptDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <CopyButton value={localizedTemplate.promptBody} label={t("templates.copyTemplate")} />
              <Link
                href={`/generator?category=${localizedTemplate.category}&promptType=${localizedTemplate.promptType}`}
                className={buttonStyles({ variant: "outline" })}
              >
                {t("templates.useInGenerator")}
              </Link>
            </div>
            <div className="rounded-[26px] bg-[color:var(--brand-ink)] p-6">
              <pre className="whitespace-pre-wrap text-sm leading-7 text-white/90">
                {localizedTemplate.promptBody}
              </pre>
            </div>
            <div className="flex flex-wrap gap-2">
              {localizedTemplate.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[color:var(--soft-panel)] px-3 py-1 text-xs font-medium text-[color:var(--brand-ink)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
