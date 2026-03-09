import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { DISCLAIMER_TEXT } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[rgba(255,255,255,0.62)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <BrandLockup showTagline={false} />
          <p className="max-w-3xl text-sm uppercase tracking-[0.18em] text-[color:var(--muted-strong)]">
            Legal-tech drafting infrastructure for Bangladesh advocates
          </p>
          <p className="max-w-3xl text-sm leading-7 text-[color:var(--muted)]">
            {DISCLAIMER_TEXT}
          </p>
        </div>
        <div className="grid gap-3 text-sm text-[color:var(--muted-strong)]">
          <Link href="/" className="transition hover:text-[color:var(--brand-panel)]">
            Home
          </Link>
          <Link
            href="/generator"
            className="transition hover:text-[color:var(--brand-panel)]"
          >
            Prompt Generator
          </Link>
          <Link
            href="/templates"
            className="transition hover:text-[color:var(--brand-panel)]"
          >
            Templates Library
          </Link>
          <Link
            href="/dashboard"
            className="transition hover:text-[color:var(--brand-panel)]"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
