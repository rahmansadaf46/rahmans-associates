"use client";

import Link from "next/link";
import { Download, RotateCcw, Sparkles } from "lucide-react";

import { useTranslations } from "@/components/i18n-provider";
import { CopyButton } from "@/components/ui/copy-button";
import { Button, buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { GenerationInsights } from "@/lib/ai-contract";

type PromptOutputPanelProps = {
  generatedInsights: GenerationInsights | null;
  generationStatus: string;
  generatedPrompt: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  savedToHistory: boolean;
  onDownload: () => void;
  onRegenerate: () => void;
};

export function PromptOutputPanel({
  generatedInsights,
  generationStatus,
  generatedPrompt,
  isLoading,
  isAuthenticated,
  savedToHistory,
  onDownload,
  onRegenerate,
}: PromptOutputPanelProps) {
  const t = useTranslations();
  const hasOutput = Boolean(generatedPrompt) || isLoading;
  const emptyTips = [
    t("generator.emptyTips.first"),
    t("generator.emptyTips.second"),
    t("generator.emptyTips.third"),
  ];

  return (
    <Card className="overflow-hidden border-[color:var(--border-strong)] bg-[linear-gradient(180deg,rgba(9,13,22,0.98),rgba(9,13,22,0.92)_20%,rgba(12,18,31,0.94))] 2xl:min-h-[calc(100vh-9.5rem)]">
      <CardHeader className="border-b border-[color:var(--border)] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
            <Sparkles className="size-5" />
          </div>
          <div>
            <CardTitle className="text-3xl">{t("generator.outputTitle")}</CardTitle>
            <CardDescription className="mt-2 max-w-xl text-sm leading-7">
              {t("generator.outputDescription")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex h-full flex-col gap-6 p-6 sm:p-8">
        {hasOutput ? (
          <>
            <div className="rounded-[22px] border border-[color:var(--border)] bg-white/[0.03] px-4 py-3 text-sm text-[color:var(--muted-strong)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/60">
                <span className="size-2 rounded-full bg-[color:var(--accent-strong)]" />
                {isLoading ? generationStatus || t("generator.loading") : t("generator.readyStatus")}
              </span>
            </div>

            {generatedInsights ? (
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="space-y-4">
                  <div className="rounded-[24px] border border-[color:var(--border)] bg-white/[0.03] p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                      {t("generator.suggestedTitleTitle")}
                    </p>
                    <p className="mt-3 font-[family:var(--font-serif)] text-2xl text-[color:var(--text-strong)]">
                      {generatedInsights.suggestedTitle}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[color:var(--border)] bg-white/[0.03] p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                      {t("generator.summaryTitle")}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--muted-strong)]">
                      {generatedInsights.summary}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[24px] border border-[color:var(--border)] bg-white/[0.03] p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                      {t("generator.nextStepsTitle")}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-[color:var(--muted-strong)]">
                      {generatedInsights.nextSteps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[24px] border border-[color:var(--border)] bg-white/[0.03] p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                      {t("generator.tagsTitle")}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {generatedInsights.suggestedTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-[color:var(--muted-strong)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01)),var(--brand-panel-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
                <span className="size-2.5 rounded-full bg-white/25" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/10" />
              </div>
              <div className="max-h-[38rem] overflow-auto p-5 sm:p-6">
                <pre className="whitespace-pre-wrap text-sm leading-7 text-white/90">
                  {generatedPrompt || generationStatus}
                  {isLoading ? (
                    <span className="ml-1 inline-block h-[1.05em] w-px animate-pulse bg-[color:var(--accent-strong)] align-[-0.1em]" />
                  ) : null}
                </pre>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <CopyButton value={generatedPrompt} label={t("generator.copyPrompt")} />
              <Button
                variant="outline"
                size="sm"
                onClick={onRegenerate}
                loading={isLoading}
                loadingText={t("generator.regenerateLoading")}
                disabled={!generatedPrompt}
              >
                <RotateCcw className="size-4" />
                {t("generator.regenerate")}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={onDownload}
                disabled={!generatedPrompt}
              >
                <Download className="size-4" />
                {t("generator.download")}
              </Button>
            </div>

            <div className="rounded-[22px] border border-[color:var(--border)] bg-white/[0.03] p-4 text-sm leading-7 text-[color:var(--muted)]">
              {isAuthenticated ? (
                savedToHistory
                  ? t("generator.savedMessage")
                  : t("generator.unsavedMessage")
              ) : (
                <>
                  {t("generator.guestLead")}{" "}
                  <Link href="/login" className="font-semibold text-[color:var(--text-strong)]">
                    {t("generator.guestLogin")}
                  </Link>{" "}
                  {t("generator.guestTail")}
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-[28rem] flex-col justify-between rounded-[28px] border border-dashed border-[color:var(--border-strong)] bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:min-h-[31rem] sm:p-8">
            <div>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                {t("generator.beginnerFriendlyLabel")}
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-5 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <h3 className="mt-5 font-[family:var(--font-serif)] text-3xl text-[color:var(--text-strong)]">
                    {t("generator.emptyTitle")}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-[color:var(--muted)]">
                    {t("generator.emptyDescription")}
                  </p>
                </div>
              </div>


              <div className="mt-6 grid gap-3">
                {emptyTips.map((tip, index) => (
                  <div
                    key={tip}
                    className="rounded-[20px] border border-white/8 bg-black/20 px-4 py-4"
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
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[t("generator.requestLabel"), t("generator.promptTypeLabel"), t("generator.outputTitle")].map(
                (label, index) => (
                  <div
                    key={label}
                    className="rounded-[20px] border border-white/8 bg-black/20 px-4 py-4"
                  >
                    <p className="text-[0.64rem] uppercase tracking-[0.22em] text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-sm font-medium text-[color:var(--text-strong)]">
                      {label}
                    </p>
                  </div>
                ),
              )}
            </div>

            <Link
              href="/templates"
              className={buttonStyles({
                variant: "outline",
                className: "mt-6 w-full self-start sm:w-auto",
              })}
            >
              {t("generator.browseTemplates")}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
