import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { BRAND_NAME } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="px-6 py-24">
      <div className="page-shell rounded-[32px] border border-[color:var(--border)] bg-white/75 p-10 text-center shadow-[0_20px_60px_rgba(14,28,54,0.08)]">
        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
          404
        </p>
        <h1 className="mt-4 font-[family:var(--font-serif)] text-5xl text-[color:var(--brand-ink)]">
          The requested page was not found.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
          The page may have moved, or the resource does not exist in the current{" "}
          {BRAND_NAME} workspace.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className={buttonStyles()}>
            Return Home
          </Link>
          <Link href="/templates" className={buttonStyles({ variant: "outline" })}>
            Browse Templates
          </Link>
        </div>
      </div>
    </div>
  );
}
