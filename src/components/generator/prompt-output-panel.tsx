"use client";

import Link from "next/link";
import { Download, RotateCcw, Sparkles } from "lucide-react";

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
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Generated Prompt</CardTitle>
        <CardDescription>
          Review, copy, regenerate, or download the structured prompt.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-5">
        {generatedPrompt ? (
          <>
            <div className="rounded-[26px] border border-[color:var(--border)] bg-[color:var(--brand-ink)] p-5">
              <pre className="whitespace-pre-wrap text-sm leading-7 text-white/90">
                {generatedPrompt}
              </pre>
            </div>
            <div className="flex flex-wrap gap-3">
              <CopyButton value={generatedPrompt} label="Copy Prompt" />
              <Button
                variant="outline"
                size="sm"
                onClick={onRegenerate}
                loading={isLoading}
                loadingText="Regenerating..."
              >
                <RotateCcw className="size-4" />
                Regenerate
              </Button>
              <Button variant="secondary" size="sm" onClick={onDownload}>
                <Download className="size-4" />
                Download .txt
              </Button>
            </div>
            {isAuthenticated ? (
              <p className="text-sm text-[color:var(--muted)]">
                {savedToHistory
                  ? "This generation was saved to your dashboard history."
                  : "Sign-in state detected, but this prompt could not be saved."}
              </p>
            ) : (
              <p className="text-sm text-[color:var(--muted)]">
                Generate as a guest or{" "}
                <Link href="/login" className="font-semibold text-[color:var(--brand-ink)]">
                  login
                </Link>{" "}
                to save prompts automatically.
              </p>
            )}
          </>
        ) : (
          <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[26px] border border-dashed border-[color:var(--border-strong)] bg-white/55 p-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-[color:var(--soft-panel)] text-[color:var(--accent-deep)]">
              <Sparkles className="size-6" />
            </div>
            <h3 className="mt-6 font-[family:var(--font-serif)] text-3xl text-[color:var(--brand-ink)]">
              Your prompt will appear here
            </h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-[color:var(--muted)]">
              Submit the form with your legal request in Bangla or English. The app
              will return a polished prompt tailored to Bangladesh legal work.
            </p>
            <Link
              href="/templates"
              className={buttonStyles({ variant: "outline", className: "mt-6" })}
            >
              Browse Ready-Made Templates
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
