import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLegalCategoryLabels, getPromptTypeLabels } from "@/lib/prompt-options";
import { getServerI18n } from "@/lib/server-i18n";
import { localizeTemplateRecords } from "@/lib/template-localizations";
import type { TemplateRecord } from "@/server/services/template-service";

export async function FeaturedTemplateList({
  templates,
}: {
  templates: TemplateRecord[];
}) {
  const { locale, t } = await getServerI18n();
  const legalCategoryLabels = getLegalCategoryLabels(t);
  const promptTypeLabels = getPromptTypeLabels(t);
  const localizedTemplates = localizeTemplateRecords(templates, locale);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t("home.featuredTemplates.eyebrow")}
            title={t("home.featuredTemplates.title")}
            description={t("home.featuredTemplates.description")}
          />
          <Link
            href="/templates"
            className={buttonStyles({ variant: "outline", className: "self-start" })}
          >
            {t("home.featuredTemplates.viewAll")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {localizedTemplates.map((template) => (
            <Card key={template.slug}>
              <CardHeader>
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {legalCategoryLabels[template.category]} •{" "}
                  {promptTypeLabels[template.promptType]}
                </p>
                <CardTitle className="text-3xl">{template.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm leading-7 text-[color:var(--muted)]">
                  {template.description}
                </p>
                <Link
                  href={`/templates/${template.slug}`}
                  className={buttonStyles({ variant: "outline", size: "sm" })}
                >
                  {t("home.featuredTemplates.open")}
                  <ArrowRight className="size-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
