"use client";

import { cn } from "@/lib/utils";
import { useI18n, useTranslations } from "@/components/i18n-provider";

export function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const { isSwitching, locale, setLocale } = useI18n();
  const t = useTranslations();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/6 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur",
        className,
      )}
      aria-label={t("language.label")}
      role="group"
    >
      {(["en", "bn"] as const).map((value) => {
        const active = locale === value;

        return (
          <button
            key={value}
            type="button"
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] disabled:opacity-60",
              active
                ? "bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] text-[color:var(--button-secondary-text)] shadow-[0_8px_20px_rgba(0,0,0,0.28)]"
                : "text-[color:var(--text-muted)] hover:bg-white/8 hover:text-[color:var(--text-strong)]",
            )}
            disabled={isSwitching}
            onClick={() => setLocale(value)}
          >
            {t(`language.${value}`)}
          </button>
        );
      })}
    </div>
  );
}
