"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";

import { CopyButton } from "@/components/ui/copy-button";
import { buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  LEGAL_CATEGORY_LABELS,
  LEGAL_CATEGORY_OPTIONS,
  PROMPT_LANGUAGE_LABELS,
  PROMPT_TYPE_LABELS,
} from "@/lib/constants";
import type { TemplateRecord } from "@/server/services/template-service";

export function TemplateLibrary({
  templates,
}: {
  templates: TemplateRecord[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("ALL");
  const deferredSearch = useDeferredValue(search);

  const filteredTemplates = templates.filter((template) => {
    const searchText = [
      template.title,
      template.description,
      template.promptBody,
      template.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    const matchesSearch = searchText.includes(deferredSearch.toLowerCase());
    const matchesCategory = category === "ALL" || template.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="grid gap-4 p-6 md:grid-cols-[1fr_220px]">
          <div className="field-shell">
            <label htmlFor="template-search" className="field-label">
              Search templates
            </label>
            <Input
              id="template-search"
              placeholder="Search by title, category, or drafting goal"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="field-shell">
            <label htmlFor="template-category" className="field-label">
              Filter by category
            </label>
            <Select
              id="template-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="ALL">All categories</option>
              {LEGAL_CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-[color:var(--muted)]">
        Showing {filteredTemplates.length} of {templates.length} templates.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {filteredTemplates.map((template) => (
          <Card key={template.slug}>
            <CardHeader>
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {LEGAL_CATEGORY_LABELS[template.category]} •{" "}
                {PROMPT_TYPE_LABELS[template.promptType]}
              </p>
              <CardTitle className="text-3xl">{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[color:var(--soft-panel)] px-3 py-1 text-xs font-medium text-[color:var(--brand-ink)]"
                  >
                    {tag}
                  </span>
                ))}
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[color:var(--muted)]">
                  {PROMPT_LANGUAGE_LABELS[template.language]}
                </span>
              </div>
              <p className="line-clamp-4 text-sm leading-7 text-[color:var(--muted)]">
                {template.promptBody}
              </p>
              <div className="flex flex-wrap gap-3">
                <CopyButton value={template.promptBody} label="Copy Template" />
                <Link
                  href={`/templates/${template.slug}`}
                  className={buttonStyles({ variant: "outline", size: "sm" })}
                >
                  Open Details
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
