import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LEGAL_CATEGORY_LABELS, PROMPT_TYPE_LABELS } from "@/lib/constants";
import type { TemplateRecord } from "@/server/services/template-service";

export function FeaturedTemplateList({
  templates,
}: {
  templates: TemplateRecord[];
}) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured Templates"
            title="Start from battle-tested drafting prompts."
            description="The library includes seeded Bangladesh-focused prompt templates that can be copied directly or adapted inside the generator."
          />
          <Link
            href="/templates"
            className={buttonStyles({ variant: "outline", className: "self-start" })}
          >
            View All Templates
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.slug}>
              <CardHeader>
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {LEGAL_CATEGORY_LABELS[template.category]} •{" "}
                  {PROMPT_TYPE_LABELS[template.promptType]}
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
                  Open Template
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
