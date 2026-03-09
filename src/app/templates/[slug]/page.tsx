import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/ui/copy-button";
import { buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BRAND_NAME,
  LEGAL_CATEGORY_LABELS,
  PROMPT_LANGUAGE_LABELS,
  PROMPT_TYPE_LABELS,
} from "@/lib/constants";
import { getTemplateBySlug } from "@/server/services/template-service";

type TemplateDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: TemplateDetailsPageProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  if (!template) {
    return {
      title: "Template Not Found",
    };
  }

  return {
    title: template.title,
    description: template.description,
  };
}

export default async function TemplateDetailsPage({
  params,
}: TemplateDetailsPageProps) {
  const { slug } = await params;
  const template = await getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return (
    <div className="px-6 py-16 sm:py-20">
      <div className="page-shell space-y-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {BRAND_NAME} •{" "}
            {LEGAL_CATEGORY_LABELS[template.category]} •{" "}
            {PROMPT_TYPE_LABELS[template.promptType]} •{" "}
            {PROMPT_LANGUAGE_LABELS[template.language]}
          </p>
          <h1 className="max-w-4xl font-[family:var(--font-serif)] text-5xl leading-tight text-[color:var(--brand-ink)]">
            {template.title}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
            {template.description}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Template Prompt</CardTitle>
            <CardDescription>
              Copy the template directly or use it as a starting point in the
              generator.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <CopyButton value={template.promptBody} label="Copy Template" />
              <Link
                href={`/generator?category=${template.category}&promptType=${template.promptType}`}
                className={buttonStyles({ variant: "outline" })}
              >
                Use in Generator
              </Link>
            </div>
            <div className="rounded-[26px] bg-[color:var(--brand-ink)] p-6">
              <pre className="whitespace-pre-wrap text-sm leading-7 text-white/90">
                {template.promptBody}
              </pre>
            </div>
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag) => (
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
