"use client";

import { ShieldAlert } from "lucide-react";

import { useTranslations } from "@/components/i18n-provider";

export function DisclaimerBanner() {
  const t = useTranslations();

  return (
    <div className="rounded-[24px] border border-[color:var(--border-strong)] bg-[color:var(--soft-panel)] p-4 text-sm leading-6 text-[color:var(--brand-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur">
      <div className="flex items-start gap-3">
        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-[color:var(--accent-deep)]" />
        <p>{t("disclaimer.text")}</p>
      </div>
    </div>
  );
}
