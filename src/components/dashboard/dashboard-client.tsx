"use client";

import { useDeferredValue, useState, useTransition } from "react";
import { Heart, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useTranslations } from "@/components/i18n-provider";
import { CopyButton } from "@/components/ui/copy-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  getLegalCategoryLabels,
  getPromptLanguageLabels,
  getPromptToneLabels,
  getPromptTypeLabels,
} from "@/lib/prompt-options";
import { formatDateTime, truncateText } from "@/lib/utils";
import type { DashboardPromptRecord } from "@/server/services/dashboard-service";

export function DashboardClient({
  initialPrompts,
}: {
  initialPrompts: DashboardPromptRecord[];
}) {
  const t = useTranslations();
  const [prompts, setPrompts] = useState(initialPrompts);
  const [search, setSearch] = useState("");
  const [activePromptId, setActivePromptId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const deferredSearch = useDeferredValue(search);
  const legalCategoryLabels = getLegalCategoryLabels(t);
  const promptLanguageLabels = getPromptLanguageLabels(t);
  const promptToneLabels = getPromptToneLabels(t);
  const promptTypeLabels = getPromptTypeLabels(t);

  const filteredPrompts = prompts.filter((prompt) => {
    const haystack = [
      prompt.inputRequest,
      prompt.generatedPrompt,
      prompt.caseTitle ?? "",
      legalCategoryLabels[prompt.category as keyof typeof legalCategoryLabels],
      promptTypeLabels[prompt.promptType as keyof typeof promptTypeLabels],
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(deferredSearch.toLowerCase());
  });

  const favoritePrompts = filteredPrompts.filter((prompt) => prompt.isFavorite);

  function handleDelete(promptId: string) {
    setActivePromptId(promptId);
    startTransition(async () => {
      try {
        const response = await fetch(`/api/prompts/${promptId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          toast.error(t("dashboard.deleteFailed"));
          setActivePromptId(null);
          return;
        }

        setPrompts((current) => current.filter((item) => item.id !== promptId));
        toast.success(t("dashboard.deleted"));
        setActivePromptId(null);
      } catch {
        toast.error(t("dashboard.deleteFailed"));
        setActivePromptId(null);
      }
    });
  }

  function handleFavorite(promptId: string) {
    setActivePromptId(promptId);
    startTransition(async () => {
      try {
        const response = await fetch(`/api/prompts/${promptId}/favorite`, {
          method: "POST",
        });

        const payload = (await response.json().catch(() => null)) as
          | { isFavorite?: boolean }
          | null;

        if (!response.ok || typeof payload?.isFavorite !== "boolean") {
          toast.error(t("dashboard.favoriteFailed"));
          setActivePromptId(null);
          return;
        }

        const nextFavorite = payload.isFavorite;

        setPrompts((current) =>
          current.map((prompt) =>
            prompt.id === promptId
              ? { ...prompt, isFavorite: nextFavorite }
              : prompt,
          ),
        );
        toast.success(
          nextFavorite ? t("dashboard.favoriteSaved") : t("dashboard.favoriteRemoved"),
        );
        setActivePromptId(null);
      } catch {
        toast.error(t("dashboard.favoriteFailed"));
        setActivePromptId(null);
      }
    });
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
              {t("dashboard.totalPrompts")}
            </p>
            <p className="mt-3 font-[family:var(--font-serif)] text-4xl text-[color:var(--brand-ink)]">
              {prompts.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
              {t("dashboard.favorites")}
            </p>
            <p className="mt-3 font-[family:var(--font-serif)] text-4xl text-[color:var(--brand-ink)]">
              {prompts.filter((prompt) => prompt.isFavorite).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
              {t("dashboard.latestActivity")}
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--brand-ink)]">
              {prompts[0] ? formatDateTime(prompts[0].createdAt) : t("dashboard.noPromptsYet")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="field-shell">
            <label htmlFor="dashboard-search" className="field-label">
              {t("dashboard.searchLabel")}
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[color:var(--muted)]" />
              <Input
                id="dashboard-search"
                className="pl-11"
                placeholder={t("dashboard.searchPlaceholder")}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {favoritePrompts.length > 0 ? (
        <section className="space-y-4">
          <div>
            <h2 className="font-[family:var(--font-serif)] text-3xl text-[color:var(--text-strong)]">
              {t("dashboard.favoritePromptsTitle")}
            </h2>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              {t("dashboard.favoritePromptsDescription")}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {favoritePrompts.map((prompt) => (
              <Card key={`favorite-${prompt.id}`}>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                        {legalCategoryLabels[
                          prompt.category as keyof typeof legalCategoryLabels
                        ]}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-[color:var(--text-strong)]">
                        {prompt.caseTitle || truncateText(prompt.inputRequest, 64)}
                      </h3>
                    </div>
                    <Heart className="size-5 fill-[color:var(--accent-deep)] text-[color:var(--accent-deep)]" />
                  </div>
                  <p className="text-sm leading-7 text-[color:var(--muted)]">
                    {truncateText(prompt.generatedPrompt, 220)}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <CopyButton value={prompt.generatedPrompt} label={t("dashboard.copy")} />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFavorite(prompt.id)}
                      loading={isPending && activePromptId === prompt.id}
                      loadingText={t("dashboard.updating")}
                    >
                      {t("dashboard.removeFavorite")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <div>
          <h2 className="font-[family:var(--font-serif)] text-3xl text-[color:var(--text-strong)]">
            {t("dashboard.promptHistoryTitle")}
          </h2>
          <p className="text-sm leading-7 text-[color:var(--muted)]">
            {t("dashboard.promptHistoryDescription")}
          </p>
        </div>

        {filteredPrompts.length ? (
          <div className="grid gap-6">
            {filteredPrompts.map((prompt) => (
              <Card key={prompt.id}>
                <CardContent className="space-y-5 p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                        {legalCategoryLabels[
                          prompt.category as keyof typeof legalCategoryLabels
                        ]}{" "}
                        •{" "}
                        {promptTypeLabels[
                          prompt.promptType as keyof typeof promptTypeLabels
                        ]}
                      </p>
                      <h3 className="text-xl font-semibold text-[color:var(--text-strong)]">
                        {prompt.caseTitle || truncateText(prompt.inputRequest, 88)}
                      </h3>
                      <p className="text-sm leading-7 text-[color:var(--muted)]">
                        {t("dashboard.generatedOn", {
                          date: formatDateTime(prompt.createdAt),
                        })}{" "}
                        •{" "}
                        {promptLanguageLabels[
                          prompt.desiredLanguage as keyof typeof promptLanguageLabels
                        ]}{" "}
                        •{" "}
                        {promptToneLabels[
                          prompt.tone as keyof typeof promptToneLabels
                        ]}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <CopyButton value={prompt.generatedPrompt} label={t("dashboard.copy")} />
                      <Button
                        variant={prompt.isFavorite ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleFavorite(prompt.id)}
                        loading={isPending && activePromptId === prompt.id}
                        loadingText={t("dashboard.updating")}
                      >
                        <Heart
                          className={`size-4 ${
                            prompt.isFavorite ? "fill-current" : ""
                          }`}
                        />
                        {prompt.isFavorite
                          ? t("dashboard.favorited")
                          : t("dashboard.favorite")}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(prompt.id)}
                        loading={isPending && activePromptId === prompt.id}
                        loadingText={t("dashboard.deleting")}
                      >
                        <Trash2 className="size-4" />
                        {t("dashboard.delete")}
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-5 xl:grid-cols-2">
                    <div className="rounded-[24px] border border-[color:var(--border)] bg-white/4 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                        {t("dashboard.originalRequest")}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--text-strong)]">
                        {prompt.inputRequest}
                      </p>
                    </div>
                    <div className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--brand-ink)] p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/65">
                        {t("dashboard.generatedPrompt")}
                      </p>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/90">
                        {truncateText(prompt.generatedPrompt, 420)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="font-[family:var(--font-serif)] text-3xl text-[color:var(--text-strong)]">
                {t("dashboard.noMatchTitle")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                {t("dashboard.noMatchDescription")}
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
