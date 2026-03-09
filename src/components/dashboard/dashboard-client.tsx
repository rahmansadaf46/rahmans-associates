"use client";

import { useDeferredValue, useState, useTransition } from "react";
import { Heart, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { CopyButton } from "@/components/ui/copy-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  LEGAL_CATEGORY_LABELS,
  PROMPT_LANGUAGE_LABELS,
  PROMPT_TONE_LABELS,
  PROMPT_TYPE_LABELS,
} from "@/lib/constants";
import { formatDateTime, truncateText } from "@/lib/utils";
import type { DashboardPromptRecord } from "@/server/services/dashboard-service";

export function DashboardClient({
  initialPrompts,
}: {
  initialPrompts: DashboardPromptRecord[];
}) {
  const [prompts, setPrompts] = useState(initialPrompts);
  const [search, setSearch] = useState("");
  const [activePromptId, setActivePromptId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const deferredSearch = useDeferredValue(search);

  const filteredPrompts = prompts.filter((prompt) => {
    const haystack = [
      prompt.inputRequest,
      prompt.generatedPrompt,
      prompt.caseTitle ?? "",
      LEGAL_CATEGORY_LABELS[prompt.category as keyof typeof LEGAL_CATEGORY_LABELS],
      PROMPT_TYPE_LABELS[prompt.promptType as keyof typeof PROMPT_TYPE_LABELS],
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
          toast.error("Could not delete the prompt.");
          setActivePromptId(null);
          return;
        }

        setPrompts((current) => current.filter((item) => item.id !== promptId));
        toast.success("Prompt deleted.");
        setActivePromptId(null);
      } catch {
        toast.error("Could not delete the prompt.");
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
          toast.error("Could not update favorite status.");
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
          nextFavorite ? "Saved to favorites." : "Removed from favorites.",
        );
        setActivePromptId(null);
      } catch {
        toast.error("Could not update favorite status.");
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
              Total prompts
            </p>
            <p className="mt-3 font-[family:var(--font-serif)] text-4xl text-[color:var(--brand-ink)]">
              {prompts.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Favorites
            </p>
            <p className="mt-3 font-[family:var(--font-serif)] text-4xl text-[color:var(--brand-ink)]">
              {prompts.filter((prompt) => prompt.isFavorite).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Latest activity
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--brand-ink)]">
              {prompts[0] ? formatDateTime(prompts[0].createdAt) : "No prompts yet"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="field-shell">
            <label htmlFor="dashboard-search" className="field-label">
              Search prompt history
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[color:var(--muted)]" />
              <Input
                id="dashboard-search"
                className="pl-11"
                placeholder="Search by request, category, prompt type, or content"
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
            <h2 className="font-[family:var(--font-serif)] text-3xl text-[color:var(--brand-ink)]">
              Favorite Prompts
            </h2>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Quick access to your most useful drafting instructions.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {favoritePrompts.map((prompt) => (
              <Card key={`favorite-${prompt.id}`}>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                        {LEGAL_CATEGORY_LABELS[
                          prompt.category as keyof typeof LEGAL_CATEGORY_LABELS
                        ]}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-[color:var(--brand-ink)]">
                        {prompt.caseTitle || truncateText(prompt.inputRequest, 64)}
                      </h3>
                    </div>
                    <Heart className="size-5 fill-[color:var(--accent-deep)] text-[color:var(--accent-deep)]" />
                  </div>
                  <p className="text-sm leading-7 text-[color:var(--muted)]">
                    {truncateText(prompt.generatedPrompt, 220)}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <CopyButton value={prompt.generatedPrompt} label="Copy" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFavorite(prompt.id)}
                      loading={isPending && activePromptId === prompt.id}
                      loadingText="Updating..."
                    >
                      Remove Favorite
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
          <h2 className="font-[family:var(--font-serif)] text-3xl text-[color:var(--brand-ink)]">
            Prompt History
          </h2>
          <p className="text-sm leading-7 text-[color:var(--muted)]">
            Searchable history of generated prompts saved to your account.
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
                        {LEGAL_CATEGORY_LABELS[
                          prompt.category as keyof typeof LEGAL_CATEGORY_LABELS
                        ]}{" "}
                        •{" "}
                        {PROMPT_TYPE_LABELS[
                          prompt.promptType as keyof typeof PROMPT_TYPE_LABELS
                        ]}
                      </p>
                      <h3 className="text-xl font-semibold text-[color:var(--brand-ink)]">
                        {prompt.caseTitle || truncateText(prompt.inputRequest, 88)}
                      </h3>
                      <p className="text-sm leading-7 text-[color:var(--muted)]">
                        Generated {formatDateTime(prompt.createdAt)} •{" "}
                        {PROMPT_LANGUAGE_LABELS[
                          prompt.desiredLanguage as keyof typeof PROMPT_LANGUAGE_LABELS
                        ]}{" "}
                        •{" "}
                        {PROMPT_TONE_LABELS[
                          prompt.tone as keyof typeof PROMPT_TONE_LABELS
                        ]}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <CopyButton value={prompt.generatedPrompt} label="Copy" />
                      <Button
                        variant={prompt.isFavorite ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleFavorite(prompt.id)}
                        loading={isPending && activePromptId === prompt.id}
                        loadingText="Updating..."
                      >
                        <Heart
                          className={`size-4 ${
                            prompt.isFavorite ? "fill-current" : ""
                          }`}
                        />
                        {prompt.isFavorite ? "Favorited" : "Favorite"}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(prompt.id)}
                        loading={isPending && activePromptId === prompt.id}
                        loadingText="Deleting..."
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-5 xl:grid-cols-2">
                    <div className="rounded-[24px] border border-[color:var(--border)] bg-white/70 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                        Original request
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--brand-ink)]">
                        {prompt.inputRequest}
                      </p>
                    </div>
                    <div className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--brand-ink)] p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/65">
                        Generated prompt
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
              <h3 className="font-[family:var(--font-serif)] text-3xl text-[color:var(--brand-ink)]">
                No prompts match your search.
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                Generate a new prompt or clear the search term to see your full
                history.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
