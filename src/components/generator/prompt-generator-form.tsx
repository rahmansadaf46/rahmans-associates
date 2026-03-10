"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  ChevronDown,
  FileText,
  Languages,
  Scale,
  Sparkles,
  type LucideIcon,
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
import type { GenerationInsights, PromptStreamEvent } from "@/lib/ai-contract";
import { cn } from "@/lib/utils";
import type { TemplateRecord } from "@/server/services/template-service";

type GeneratorErrorResponse = {
  error?: string;
};

type GeneratorSectionId = "request" | "facts" | "output";

type GeneratorAccordionSectionProps = {
  children: ReactNode;
  description: string;
  icon: LucideIcon;
  id: GeneratorSectionId;
  isOpen: boolean;
  onToggle: () => void;
  stepLabel: string;
  summaryItems?: string[];
  title: string;
};

function getSectionForField(fieldName: keyof PromptRequestValues): GeneratorSectionId {
  switch (fieldName) {
    case "userRequest":
    case "category":
    case "promptType":
      return "request";
    case "caseTitle":
    case "courtName":
    case "facts":
    case "relevantLaw":
      return "facts";
    case "desiredLanguage":
    case "tone":
    default:
      return "output";
  }
}

function GeneratorAccordionSection({
  children,
  description,
  icon: Icon,
  id,
  isOpen,
  onToggle,
  stepLabel,
  summaryItems = [],
  title,
}: GeneratorAccordionSectionProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-[30px] border transition",
        isOpen
          ? "border-[color:var(--accent-border)] bg-white/[0.04] shadow-[0_18px_44px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "border-[color:var(--border)] bg-black/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
      )}
    >
      <button
        type="button"
        aria-controls={`${id}-panel`}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 px-6 py-6 text-left sm:px-7"
        onClick={onToggle}
      >
        <div className="flex min-w-0 items-start gap-4">
          <div
            className={cn(
              "mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl border text-[color:var(--accent-strong)] transition",
              isOpen
                ? "border-[color:var(--accent-border)] bg-[color:var(--soft-panel-strong)]"
                : "border-white/10 bg-[color:var(--soft-panel)]",
            )}
          >
            <Icon className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/45">
                {stepLabel}
              </p>
              {summaryItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.68rem] text-[color:var(--muted-strong)]"
                >
                  {item}
                </span>
              ))}
            </div>
            <h3 className="mt-3 font-[family:var(--font-serif)] text-2xl text-[color:var(--text-strong)]">
              {title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
              {description}
            </p>
          </div>
        </div>

        <div className="pt-1">
          <ChevronDown
            className={cn(
              "size-5 text-[color:var(--muted-strong)] transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </div>
      </button>

      {isOpen ? (
        <div
          id={`${id}-panel`}
          role="region"
          className="border-t border-[color:var(--border)] px-6 py-6 sm:px-7 sm:py-7"
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}

export function PromptGeneratorForm({
  featuredTemplates,
}: {
  featuredTemplates: TemplateRecord[];
}) {
  const t = useTranslations();
  const { locale } = useI18n();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [savedToHistory, setSavedToHistory] = useState(false);
  const [lastPayload, setLastPayload] = useState<PromptRequestValues | null>(null);
  const [activeSection, setActiveSection] = useState<GeneratorSectionId>("request");
  const [generationStatus, setGenerationStatus] = useState("");
  const [generationInsights, setGenerationInsights] = useState<GenerationInsights | null>(
    null,
  );
  const legalCategoryLabels = getLegalCategoryLabels(t);
  const legalCategoryOptions = getLegalCategoryOptions(t);
  const promptLanguageOptions = getPromptLanguageOptions(t);
  const promptToneOptions = getPromptToneOptions(t);
  const promptTypeOptions = getPromptTypeOptions(t);
  const sampleRequestSuggestions = getSampleRequestSuggestions(t);
  const localizedFeaturedTemplates = localizeTemplateRecords(featuredTemplates, locale);
  const generationStageMessages = {
    preparing: t("generator.statusPreparing"),
    drafting: t("generator.statusDrafting"),
    enhancing: t("generator.statusEnhancing"),
    saving: t("generator.statusSaving"),
  } as const;

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
  const selectedTone = useWatch({
    control: form.control,
    name: "tone",
  });
  const selectedCaseTitle = useWatch({
    control: form.control,
    name: "caseTitle",
  });
  const selectedCourtName = useWatch({
    control: form.control,
    name: "courtName",
  });
  const selectedFacts = useWatch({
    control: form.control,
    name: "facts",
  });
  const selectedRelevantLaw = useWatch({
    control: form.control,
    name: "relevantLaw",
  });
  const selectedCategoryOption = legalCategoryOptions.find(
    (option) => option.value === selectedCategory,
  );
  const selectedPromptTypeOption = promptTypeOptions.find(
    (option) => option.value === selectedPromptType,
  );
  const selectedLanguageOption = promptLanguageOptions.find(
    (option) => option.value === selectedLanguage,
  );
  const selectedToneOption = promptToneOptions.find(
    (option) => option.value === selectedTone,
  );
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
  const beginnerTips = [
    t("generator.beginnerTips.first"),
    t("generator.beginnerTips.second"),
    t("generator.beginnerTips.third"),
  ];
  const requestSummaryItems = [
    legalCategoryLabels[selectedCategory],
    selectedPromptTypeOption?.label ?? selectedPromptType,
  ];
  const factsSummaryItems = Array.from(
    new Set(
      [
        selectedCaseTitle?.trim(),
        selectedCourtName?.trim(),
        selectedFacts?.trim() ? t("generator.factsLabel") : "",
        selectedRelevantLaw?.trim() ? t("generator.lawLabel") : "",
      ].filter((value): value is string => Boolean(value)),
    ),
  ).slice(0, 2);
  const outputSummaryItems = [
    selectedLanguageOption?.label ?? selectedLanguage,
    selectedToneOption?.label ?? selectedTone,
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
    setGeneratedPrompt("");
    setGenerationInsights(null);
    setSavedToHistory(false);
    setGenerationStatus(generationStageMessages.preparing);
    setLastPayload(values);
    setActiveSection("output");
    setIsGenerating(true);

    const response = await fetch("/api/prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok || !response.body) {
      const payload = (await response.json().catch(() => null)) as GeneratorErrorResponse | null;
      setGenerationStatus("");
      setIsGenerating(false);
      throw new Error(payload?.error ?? t("generator.generateFailed"));
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let nextPrompt = "";
    let didComplete = false;

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) {
            continue;
          }

          const event = JSON.parse(line) as PromptStreamEvent;

          if (event.type === "status") {
            setGenerationStatus(generationStageMessages[event.stage]);
            continue;
          }

          if (event.type === "chunk") {
            nextPrompt += event.text;
            setGeneratedPrompt(nextPrompt);
            continue;
          }

          if (event.type === "error") {
            throw new Error(event.message || t("generator.generateFailed"));
          }

          if (event.type === "complete") {
            didComplete = true;
            nextPrompt = event.prompt;
            setGeneratedPrompt(event.prompt);
            setSavedToHistory(Boolean(event.savedToHistory));
            setGenerationInsights(event.insights);
            setGenerationStatus("");
            toast.success(
              event.savedToHistory
                ? t("generator.generatedSaved")
                : t("generator.generatedSuccess"),
            );
          }
        }
      }

      if (buffer.trim()) {
        const event = JSON.parse(buffer) as PromptStreamEvent;

        if (event.type === "complete") {
          didComplete = true;
          nextPrompt = event.prompt;
          setGeneratedPrompt(event.prompt);
          setSavedToHistory(Boolean(event.savedToHistory));
          setGenerationInsights(event.insights);
          setGenerationStatus("");
          toast.success(
            event.savedToHistory
              ? t("generator.generatedSaved")
              : t("generator.generatedSuccess"),
          );
        } else if (event.type === "error") {
          throw new Error(event.message || t("generator.generateFailed"));
        }
      }

      if (!didComplete) {
        throw new Error(t("generator.generateFailed"));
      }
    } finally {
      setIsGenerating(false);
    }
  }

  const handleSubmit = form.handleSubmit(
    async (values) => {
      try {
        await runGeneration(values);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t("generator.generateFailed"));
        setGenerationStatus("");
        setIsGenerating(false);
      }
    },
    (errors) => {
      const [firstErrorField] = Object.keys(errors) as Array<keyof PromptRequestValues>;

      if (firstErrorField) {
        setActiveSection(getSectionForField(firstErrorField));
      }
    },
  );

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

    void runGeneration(values).catch((error) => {
      toast.error(
        error instanceof Error ? error.message : t("generator.regenerateFailed"),
      );
      setGenerationStatus("");
      setIsGenerating(false);
    });
  }

  return (
    <div className="grid items-start gap-8 2xl:grid-cols-[minmax(0,1.38fr)_minmax(24rem,0.82fr)] 2xl:gap-10">
      <div className="space-y-6">
        <Card className="overflow-hidden border-[color:var(--border-strong)] bg-[linear-gradient(180deg,rgba(11,15,24,0.98),rgba(11,15,24,0.92)_18%,rgba(8,12,20,0.94))]">
          <CardContent className="grid gap-6 p-6 sm:p-8 xl:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.88fr)]">
            <div className="min-w-0 space-y-4">
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
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                  {t("generator.beginnerFriendlyLabel")}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
                  {t("generator.beginnerFriendlyText")}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
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
          </CardContent>
        </Card>

        <div>
          <Card className="overflow-hidden border-[color:var(--border-strong)]">
            <CardHeader className="border-b border-[color:var(--border)] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
                  <Sparkles className="size-5" />
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                    {t("generator.sampleRequestsLabel")}
                  </div>
                  <p className="text-sm font-semibold text-[color:var(--text-strong)]">
                    {t("generator.sampleRequestsTitle")}
                  </p>
                  <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
                    {t("generator.sampleRequestsDescription")}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-6 sm:p-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {sampleRequestSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="rounded-[22px] border border-[color:var(--border-strong)] bg-[color:var(--surface-strong)] px-4 py-4 text-left text-sm font-medium leading-6 text-[color:var(--text-strong)] shadow-[0_10px_26px_rgba(0,0,0,0.22)] transition hover:border-[color:var(--accent-border)] hover:bg-white/8 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--focus-ring)]"
                    onClick={() => {
                      form.setValue("userRequest", suggestion, {
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      setActiveSection("request");
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {beginnerTips.map((tip, index) => (
                  <div
                    key={tip}
                    className="rounded-[22px] border border-white/8 bg-black/20 px-4 py-4"
                  >
                    <p className="text-[0.64rem] uppercase tracking-[0.22em] text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted-strong)]">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden border-[color:var(--border-strong)] bg-[linear-gradient(180deg,rgba(11,15,24,0.98),rgba(11,15,24,0.92)_18%,rgba(8,12,20,0.94))]">
          <CardHeader className="border-b border-[color:var(--border)] p-6 sm:p-8">
            <CardTitle>{t("generator.accordionTitle")}</CardTitle>
            <CardDescription className="mt-2 max-w-3xl">
              {t("generator.accordionDescription")}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <GeneratorAccordionSection
                id="request"
                icon={FileText}
                isOpen={activeSection === "request"}
                onToggle={() => setActiveSection("request")}
                stepLabel={t("generator.requestStepLabel")}
                summaryItems={requestSummaryItems}
                title={t("generator.requestLabel")}
                description={t("generator.requestSectionDescription")}
              >
                <div className="space-y-6">
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
                      <p className="field-help">
                        {selectedCategoryOption?.description}
                      </p>
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
                      <p className="field-help">
                        {selectedPromptTypeOption?.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveSection("facts")}
                    >
                      {t("generator.factsStepLabel")} · {t("generator.factsLabel")}
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </GeneratorAccordionSection>

              <GeneratorAccordionSection
                id="facts"
                icon={Scale}
                isOpen={activeSection === "facts"}
                onToggle={() => setActiveSection("facts")}
                stepLabel={t("generator.factsStepLabel")}
                summaryItems={factsSummaryItems}
                title={t("generator.factsLabel")}
                description={t("generator.factsSectionDescription")}
              >
                <div className="space-y-6">
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

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveSection("output")}
                    >
                      {t("generator.outputStepLabel")} · {t("generator.languageLabel")}
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </GeneratorAccordionSection>

              <GeneratorAccordionSection
                id="output"
                icon={Languages}
                isOpen={activeSection === "output"}
                onToggle={() => setActiveSection("output")}
                stepLabel={t("generator.outputStepLabel")}
                summaryItems={outputSummaryItems}
                title={t("generator.languageLabel")}
                description={t("generator.outputSectionDescription")}
              >
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
                    <p className="field-help">
                      {selectedLanguageOption?.description}
                    </p>
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
                    <p className="field-help">
                      {selectedToneOption?.description}
                    </p>
                  </div>
                </div>
              </GeneratorAccordionSection>

              <div className="rounded-[28px] border border-[color:var(--border)] bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <p className="text-sm leading-7 text-[color:var(--muted)]">
                  {t("generator.outputDescription")}
                </p>
                <Button
                  type="submit"
                  className="mt-4 w-full py-4 text-base"
                  loading={isGenerating}
                  loadingText={generationStatus || t("generator.loading")}
                >
                  {t("generator.submit")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="2xl:sticky 2xl:top-28">
        <PromptOutputPanel
          generatedInsights={generationInsights}
          generationStatus={generationStatus}
          generatedPrompt={generatedPrompt}
          isLoading={isGenerating}
          isAuthenticated={Boolean(session?.user)}
          savedToHistory={savedToHistory}
          onDownload={handleDownload}
          onRegenerate={handleRegenerate}
        />
        <Card className="mt-6 overflow-hidden border-[color:var(--border-strong)]">
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
          <CardContent className="grid gap-4 p-6 sm:grid-cols-1 sm:p-8">
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
        <Card className="mt-6 overflow-hidden border-[color:var(--border-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
          <CardContent className="p-5">
            <DisclaimerBanner />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
