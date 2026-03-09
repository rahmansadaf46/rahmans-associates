import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { BrandHeroPanel } from "@/components/brand/brand-hero-panel";
import { buttonStyles } from "@/components/ui/button";
import { BRAND_HERO_LABEL, BRAND_NAME } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(201,162,90,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(18,35,59,0.18),transparent_32%)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            <Sparkles className="size-4 text-[color:var(--accent-deep)]" />
            {BRAND_HERO_LABEL}
          </div>
          <div className="space-y-6">
            <h1 className="max-w-4xl font-[family:var(--font-serif)] text-5xl leading-[1.04] text-[color:var(--brand-ink)] sm:text-6xl lg:text-7xl">
              {BRAND_NAME} turns plain legal requests into polished AI prompts for
              Bangladesh practice.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              A premium legal-tech workspace for advocates who need structured prompts
              for drafting, research, petitions, notices, agreements, and case
              preparation in Bangla or English.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/generator" className={buttonStyles({  variant: "secondary",size: "lg" })}>
              Generate Legal Prompt
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/templates"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Browse Template Library
            </Link>
          </div>
        </div>
        <BrandHeroPanel />
      </div>
    </section>
  );
}
