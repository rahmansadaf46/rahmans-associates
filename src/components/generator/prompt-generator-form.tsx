"use client";

import Link from "next/link";
import { useEffect, useTransition, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { PromptOutputPanel } from "@/components/generator/prompt-output-panel";
import { Button, buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  LEGAL_CATEGORY_LABELS,
  LEGAL_CATEGORY_OPTIONS,
  PROMPT_LANGUAGE_OPTIONS,
  PROMPT_TONE_OPTIONS,
  PROMPT_TYPE_OPTIONS,
  SAMPLE_REQUEST_SUGGESTIONS,
} from "@/lib/constants";
import {
  promptFormDefaults,
  promptRequestSchema,
  type PromptRequestValues,
} from "@/lib/validations/prompt";
import type { TemplateRecord } from "@/server/services/template-service";

type GeneratorResponse = {
  prompt?: string;
  savedToHistory?: boolean;
  error?: string;
};

export function PromptGeneratorForm({
  featuredTemplates,
}: {
  featuredTemplates: TemplateRecord[];
}) {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [savedToHistory, setSavedToHistory] = useState(false);
  const [lastPayload, setLastPayload] = useState<PromptRequestValues | null>(null);

  const form = useForm<PromptRequestValues>({
    resolver: zodResolver(promptRequestSchema),
    defaultValues: promptFormDefaults,
  });

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
        ? "Prompt generated and saved to dashboard."
        : "Prompt generated successfully.",
    );
  }

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      try {
        await runGeneration(values);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Prompt generation failed.",
        );
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
    anchor.download = "bangladesh-legal-prompt.txt";
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
          error instanceof Error ? error.message : "Prompt regeneration failed.",
        );
      }
    });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Prompt Generator</CardTitle>
            <CardDescription>
              Describe the legal task in Bangla or English. The app will turn it into
              a structured, Bangladesh-focused AI prompt.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <DisclaimerBanner />

            <div className="flex flex-wrap gap-3">
              {SAMPLE_REQUEST_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface-strong)] px-4 py-2 text-sm font-medium text-[color:var(--brand-ink)] shadow-[0_8px_20px_rgba(10,22,38,0.05)] transition hover:border-[color:var(--accent-border)] hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--focus-ring)]"
                  onClick={() => form.setValue("userRequest", suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="field-shell">
                <label htmlFor="userRequest" className="field-label">
                  Legal request
                </label>
                <Textarea
                  id="userRequest"
                  rows={5}
                  placeholder="Example: I want a bail application for a criminal case."
                  {...form.register("userRequest")}
                />
                <p className="field-help">
                  Write in Bangla or English. The system preserves legal intent and
                  structures the resulting prompt for Bangladesh practice.
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
                    Legal category
                  </label>
                  <Select id="category" {...form.register("category")}>
                    {LEGAL_CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="field-shell">
                  <label htmlFor="promptType" className="field-label">
                    Prompt type
                  </label>
                  <Select id="promptType" {...form.register("promptType")}>
                    {PROMPT_TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="field-shell">
                  <label htmlFor="caseTitle" className="field-label">
                    Case title
                  </label>
                  <Input
                    id="caseTitle"
                    placeholder="State vs. [Accused]"
                    {...form.register("caseTitle")}
                  />
                </div>
                <div className="field-shell">
                  <label htmlFor="courtName" className="field-label">
                    Court name
                  </label>
                  <Input
                    id="courtName"
                    placeholder="Court of Sessions Judge, Dhaka"
                    {...form.register("courtName")}
                  />
                </div>
              </div>

              <div className="field-shell">
                <label htmlFor="facts" className="field-label">
                  Facts of the matter
                </label>
                <Textarea
                  id="facts"
                  rows={6}
                  placeholder="Add the relevant chronology, allegations, client position, and important facts."
                  {...form.register("facts")}
                />
              </div>

              <div className="field-shell">
                <label htmlFor="relevantLaw" className="field-label">
                  Relevant law / section
                </label>
                <Textarea
                  id="relevantLaw"
                  rows={3}
                  placeholder="Optional: mention statutes, sections, rules, or ordinances to consider."
                  {...form.register("relevantLaw")}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="field-shell">
                  <label htmlFor="desiredLanguage" className="field-label">
                    Generated prompt language
                  </label>
                  <Select id="desiredLanguage" {...form.register("desiredLanguage")}>
                    {PROMPT_LANGUAGE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="field-shell">
                  <label htmlFor="tone" className="field-label">
                    Tone
                  </label>
                  <Select id="tone" {...form.register("tone")}>
                    {PROMPT_TONE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" loading={isPending} loadingText="Generating prompt...">
                Generate Prompt
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Template Shortcuts</CardTitle>
            <CardDescription>
              Jump into a seeded template or use it as a starting point for the
              generator.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {featuredTemplates.map((template) => (
              <div
                key={template.slug}
                className="rounded-[22px] border border-[color:var(--border)] bg-white/80 p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {LEGAL_CATEGORY_LABELS[template.category]}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[color:var(--brand-ink)]">
                  {template.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  {template.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/templates/${template.slug}`}
                    className={buttonStyles({ variant: "ghost", size: "sm", className: "px-0" })}
                  >
                    Open template
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <PromptOutputPanel
        generatedPrompt={generatedPrompt}
        isLoading={isPending}
        isAuthenticated={Boolean(session?.user)}
        savedToHistory={savedToHistory}
        onDownload={handleDownload}
        onRegenerate={handleRegenerate}
      />
    </div>
  );
}
