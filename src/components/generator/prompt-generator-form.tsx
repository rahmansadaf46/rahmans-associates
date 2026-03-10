"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FileText,
  Languages,
  Scale,
  Sparkles,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { useI18n, useTranslations } from "@/components/i18n-provider";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { PromptOutputPanel } from "@/components/generator/prompt-output-panel";
import { Button, buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  getLegalCategoryLabels,
  getLegalCategoryOptions,
  getPromptLanguageOptions,
  getPromptTypeOptions,
  getPromptToneOptions,
  getSampleRequestSuggestions,
} from "@/lib/prompt-options";
import { localizeTemplateRecords } from "@/lib/template-localizations";
import {
  getPromptRequestSchema,
  promptFormDefaults,
  type PromptRequestValues,
} from "@/lib/validations/prompt";
import type { TemplateRecord } from "@/server/services/template-service";

type GeneratorResponse = {
  error?: string;
  prompt?: string;
  savedToHistory?: boolean;
};

export function PromptGeneratorForm({
  featuredTemplates,
}: {
  featuredTemplates: TemplateRecord[];
}) {
  const t = useTranslations();
  const { locale } = useI18n();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [savedToHistory, setSavedToHistory] = useState(false);
  const [lastPayload, setLastPayload] = useState<PromptRequestValues | null>(null);
  const legalCategoryLabels = getLegalCategoryLabels(t);
  const legalCategoryOptions = getLegalCategoryOptions(t);
  const promptLanguageOptions = getPromptLanguageOptions(t);
  const promptToneOptions = getPromptToneOptions(t);
  const promptTypeOptions = getPromptTypeOptions(t);
  const sampleRequestSuggestions = getSampleRequestSuggestions(t);
  const localizedFeaturedTemplates = localizeTemplateRecords(featuredTemplates, locale);

  const form = useForm<PromptRequestValues>({
    resolver: zodResolver(getPromptRequestSchema(t)),
    defaultValues: promptFormDefaults,
  });

  const selectedCategory = useWatch({
    control: form.control,
    name: "category",
  });
  const selectedPromptType = useWatch({
    control: form.control,
    name: "promptType",
  });
  const selectedLanguage = useWatch({
    control: form.control,
    name: "desiredLanguage",
  });
  const selectionPills = [
    {
      icon: Scale,
      label: t("generator.categoryLabel"),
      value: legalCategoryLabels[selectedCategory],
    },
    {
      icon: FileText,
      label: t("generator.promptTypeLabel"),
      value:
        promptTypeOptions.find((option) => option.value === selectedPromptType)?.label ??
        selectedPromptType,
    },
    {
      icon: Languages,
      label: t("generator.languageLabel"),
      value:
        promptLanguageOptions.find((option) => option.value === selectedLanguage)?.label ??
        selectedLanguage,
    },
  ];

  useEffect(() => {
    const category = searchParams.get("category");
    const promptType = searchParams.get("promptType");

    if (category) {
      form.setValue("category", category as PromptRequestValues["category"]);
    }

    if (promptType) {
      form.setValue("promptType", promptType as PromptRequestValues["promptType"]);
    }
  }, [form, searchParams]);

  async function runGeneration(values: PromptRequestValues) {
    const response = await fetch("/api/prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as GeneratorResponse;

    if (!response.ok || !payload.prompt) {
      throw new Error(payload.error ?? "Prompt generation failed.");
    }

    setGeneratedPrompt(payload.prompt);
    setSavedToHistory(Boolean(payload.savedToHistory));
    setLastPayload(values);
    toast.success(
      payload.savedToHistory
        ? t("generator.generatedSaved")
        : t("generator.generatedSuccess"),
    );
  }

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      try {
        await runGeneration(values);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t("generator.generateFailed"));
      }
    });
  });

  function handleDownload() {
    if (!generatedPrompt) {
      return;
    }

    const blob = new Blob([generatedPrompt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = t("generator.downloadFilename");
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function handleRegenerate() {
    const values = lastPayload ?? form.getValues();

    startTransition(async () => {
      try {
        await runGeneration(values);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : t("generator.regenerateFailed"),
        );
      }
    });
  }

  return (
    <div className="grid items-start gap-8 xl:grid-cols-2 xl:gap-10">
      <div className="space-y-6">
        <Card className="overflow-hidden border-[color:var(--border-strong)] bg-[linear-gradient(180deg,rgba(11,15,24,0.98),rgba(11,15,24,0.92)_18%,rgba(8,12,20,0.94))]">
          <CardHeader className="border-b border-[color:var(--border)] p-0">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:items-stretch">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.22em] text-white/55">
                  <Sparkles className="size-3.5 text-[color:var(--accent-strong)]" />
                  {t("generator.cardTitle")}
                </div>
                <CardTitle className="text-3xl sm:text-[2.2rem]">
                  {t("generator.cardTitle")}
                </CardTitle>
                <CardDescription className="max-w-2xl text-base leading-7">
                  {t("generator.cardDescription")}
                </CardDescription>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {selectionPills.map((pill) => {
                  const Icon = pill.icon;

                  return (
                    <div
                      key={pill.label}
                      className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[0.64rem] uppercase tracking-[0.22em] text-white/40">
                            {pill.label}
                          </p>
                          <p className="truncate text-sm font-medium text-[color:var(--text-strong)]">
                            {pill.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 p-6 sm:p-8">
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="rounded-[28px] border border-[color:var(--border)] bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
                    <Sparkles className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/45">
                      {t("generator.requestLabel")}
                    </p>
                    <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
                      {t("generator.requestHelp")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {sampleRequestSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="rounded-[22px] border border-[color:var(--border-strong)] bg-[color:var(--surface-strong)] px-4 py-4 text-left text-sm font-medium leading-6 text-[color:var(--text-strong)] shadow-[0_10px_26px_rgba(0,0,0,0.22)] transition hover:border-[color:var(--accent-border)] hover:bg-white/8 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--focus-ring)]"
                      onClick={() => form.setValue("userRequest", suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <DisclaimerBanner />
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <section className="rounded-[30px] border border-[color:var(--border)] bg-black/15 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-[family:var(--font-serif)] text-2xl text-[color:var(--text-strong)]">
                      {t("generator.requestLabel")}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                      {t("generator.cardDescription")}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  <div className="field-shell">
                    <label htmlFor="userRequest" className="field-label">
                      {t("generator.requestLabel")}
                    </label>
                    <Textarea
                      id="userRequest"
                      rows={6}
                      placeholder={t("generator.requestPlaceholder")}
                      {...form.register("userRequest")}
                    />
                    <p className="field-help">
                      {t("generator.requestHelp")}
                    </p>
                    {form.formState.errors.userRequest ? (
                      <p className="field-error">
                        {form.formState.errors.userRequest.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="field-shell">
                      <label htmlFor="category" className="field-label">
                        {t("generator.categoryLabel")}
                      </label>
                      <Select id="category" {...form.register("category")}>
                        {legalCategoryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="field-shell">
                      <label htmlFor="promptType" className="field-label">
                        {t("generator.promptTypeLabel")}
                      </label>
                      <Select id="promptType" {...form.register("promptType")}>
                        {promptTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[30px] border border-[color:var(--border)] bg-black/15 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
                    <Scale className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-[family:var(--font-serif)] text-2xl text-[color:var(--text-strong)]">
                      {t("generator.factsLabel")}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                      {t("generator.lawPlaceholder")}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="field-shell">
                      <label htmlFor="caseTitle" className="field-label">
                        {t("generator.caseTitleLabel")}
                      </label>
                      <Input
                        id="caseTitle"
                        placeholder={t("generator.caseTitlePlaceholder")}
                        {...form.register("caseTitle")}
                      />
                    </div>
                    <div className="field-shell">
                      <label htmlFor="courtName" className="field-label">
                        {t("generator.courtNameLabel")}
                      </label>
                      <Input
                        id="courtName"
                        placeholder={t("generator.courtNamePlaceholder")}
                        {...form.register("courtName")}
                      />
                    </div>
                  </div>

                  <div className="field-shell">
                    <label htmlFor="facts" className="field-label">
                      {t("generator.factsLabel")}
                    </label>
                    <Textarea
                      id="facts"
                      rows={6}
                      placeholder={t("generator.factsPlaceholder")}
                      {...form.register("facts")}
                    />
                  </div>

                  <div className="field-shell">
                    <label htmlFor="relevantLaw" className="field-label">
                      {t("generator.lawLabel")}
                    </label>
                    <Textarea
                      id="relevantLaw"
                      rows={3}
                      placeholder={t("generator.lawPlaceholder")}
                      {...form.register("relevantLaw")}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-[30px] border border-[color:var(--border)] bg-black/15 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
                    <Languages className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-[family:var(--font-serif)] text-2xl text-[color:var(--text-strong)]">
                      {t("generator.languageLabel")}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                      {t("generator.outputDescription")}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="field-shell">
                      <label htmlFor="desiredLanguage" className="field-label">
                        {t("generator.languageLabel")}
                      </label>
                      <Select id="desiredLanguage" {...form.register("desiredLanguage")}>
                        {promptLanguageOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="field-shell">
                      <label htmlFor="tone" className="field-label">
                        {t("generator.toneLabel")}
                      </label>
                      <Select id="tone" {...form.register("tone")}>
                        {promptToneOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-4 text-base"
                    loading={isPending}
                    loadingText={t("generator.loading")}
                  >
                    {t("generator.submit")}
                  </Button>
                </div>
              </section>
            </form>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-[color:var(--border-strong)]">
          <CardHeader className="border-b border-[color:var(--border)] p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CardTitle>{t("generator.shortcutsTitle")}</CardTitle>
                <CardDescription className="mt-2 max-w-2xl">
                  {t("generator.shortcutsDescription")}
                </CardDescription>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/45">
                {localizedFeaturedTemplates.length}
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
            {localizedFeaturedTemplates.map((template) => (
              <div
                key={template.slug}
                className="rounded-[24px] border border-[color:var(--border)] bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-[color:var(--accent-border)] hover:bg-white/[0.05]"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {legalCategoryLabels[template.category]}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[color:var(--text-strong)]">
                  {template.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {template.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/templates/${template.slug}`}
                    className={buttonStyles({ variant: "outline", size: "sm" })}
                  >
                    {t("generator.openTemplate")}
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="xl:sticky xl:top-28">
        <PromptOutputPanel
          generatedPrompt={generatedPrompt}
          isLoading={isPending}
          isAuthenticated={Boolean(session?.user)}
          savedToHistory={savedToHistory}
          onDownload={handleDownload}
          onRegenerate={handleRegenerate}
        />
      </div>
    </div>
  );
}
