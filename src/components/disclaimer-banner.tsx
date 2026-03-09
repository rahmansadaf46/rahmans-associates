import { ShieldAlert } from "lucide-react";

import { DISCLAIMER_TEXT } from "@/lib/constants";

export function DisclaimerBanner() {
  return (
    <div className="rounded-[24px] border border-[color:var(--border-strong)] bg-[color:var(--soft-panel)] p-4 text-sm leading-6 text-[color:var(--brand-ink)]">
      <div className="flex items-start gap-3">
        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-[color:var(--accent-deep)]" />
        <p>{DISCLAIMER_TEXT}</p>
      </div>
    </div>
  );
}
