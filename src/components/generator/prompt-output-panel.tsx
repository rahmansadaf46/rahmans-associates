"use client";

import Link from "next/link";
import { Download, RotateCcw, Sparkles } from "lucide-react";

import { useTranslations } from "@/components/i18n-provider";
import { CopyButton } from "@/components/ui/copy-button";
import { Button, buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PromptOutputPanelProps = {
  generatedPrompt: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  savedToHistory: boolean;
  onDownload: () => void;
  onRegenerate: () => void;
};

export function PromptOutputPanel({
  generatedPrompt,
  isLoading,
  isAuthenticated,
  savedToHistory,
  onDownload,
  onRegenerate,
}: PromptOutputPanelProps) {
  const t = useTranslations();

  return (
    <Card className="overflow-hidden border-[color:var(--border-strong)] bg-[linear-gradient(180deg,rgba(9,13,22,0.98),rgba(9,13,22,0.92)_20%,rgba(12,18,31,0.94))] xl:min-h-[calc(100vh-9.5rem)]">
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
        {generatedPrompt ? (
          <>
            <div className="overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01)),var(--brand-panel-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
                <span className="size-2.5 rounded-full bg-white/25" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/10" />
              </div>
              <div className="max-h-[38rem] overflow-auto p-5 sm:p-6">
                <pre className="whitespace-pre-wrap text-sm leading-7 text-white/90">
                  {generatedPrompt}
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
              >
                <RotateCcw className="size-4" />
                {t("generator.regenerate")}
              </Button>
              <Button variant="secondary" size="sm" onClick={onDownload}>
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
          <div className="flex h-full min-h-[34rem] flex-col justify-between rounded-[28px] border border-dashed border-[color:var(--border-strong)] bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8">
            <div>
              <div className="flex size-14 items-center justify-center rounded-[22px] border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
                <Sparkles className="size-6" />
              </div>
              <h3 className="mt-6 font-[family:var(--font-serif)] text-3xl text-[color:var(--text-strong)]">
                {t("generator.emptyTitle")}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-[color:var(--muted)]">
                {t("generator.emptyDescription")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
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
              className={buttonStyles({ variant: "outline", className: "mt-6 self-start" })}
            >
              {t("generator.browseTemplates")}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
