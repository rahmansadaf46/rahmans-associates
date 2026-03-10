"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";

import { useI18n, useTranslations } from "@/components/i18n-provider";
import { CopyButton } from "@/components/ui/copy-button";
import { buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  getLegalCategoryLabels,
  getLegalCategoryOptions,
  getPromptLanguageLabels,
  getPromptTypeLabels,
} from "@/lib/prompt-options";
import { localizeTemplateRecords } from "@/lib/template-localizations";
import type { TemplateRecord } from "@/server/services/template-service";

export function TemplateLibrary({
  templates,
}: {
  templates: TemplateRecord[];
}) {
  const t = useTranslations();
  const { locale } = useI18n();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("ALL");
  const deferredSearch = useDeferredValue(search);
  const legalCategoryLabels = getLegalCategoryLabels(t);
  const legalCategoryOptions = getLegalCategoryOptions(t);
  const promptLanguageLabels = getPromptLanguageLabels(t);
  const promptTypeLabels = getPromptTypeLabels(t);
  const localizedTemplates = localizeTemplateRecords(templates, locale);

  const filteredTemplates = localizedTemplates.filter((template) => {
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
              {t("templates.searchLabel")}
            </label>
            <Input
              id="template-search"
              placeholder={t("templates.searchPlaceholder")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="field-shell">
            <label htmlFor="template-category" className="field-label">
              {t("templates.filterLabel")}
            </label>
            <Select
              id="template-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="ALL">{t("templates.allCategories")}</option>
              {legalCategoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-[color:var(--muted)]">
        {t("templates.showing", {
          total: localizedTemplates.length,
          visible: filteredTemplates.length,
        })}
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {filteredTemplates.map((template) => (
          <Card key={template.slug}>
            <CardHeader>
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {legalCategoryLabels[template.category]} •{" "}
                {promptTypeLabels[template.promptType]}
              </p>
              <CardTitle className="text-3xl">{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[color:var(--soft-panel)] px-3 py-1 text-xs font-medium text-[color:var(--text-strong)]"
                  >
                    {tag}
                  </span>
                ))}
                <span className="rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-[color:var(--muted-strong)]">
                  {promptLanguageLabels[template.language]}
                </span>
              </div>
              <p className="line-clamp-4 text-sm leading-7 text-[color:var(--muted)]">
                {template.promptBody}
              </p>
              <div className="flex flex-wrap gap-3">
                <CopyButton value={template.promptBody} label={t("templates.copyTemplate")} />
                <Link
                  href={`/templates/${template.slug}`}
                  className={buttonStyles({ variant: "outline", size: "sm" })}
                >
                  {t("templates.openDetails")}
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
