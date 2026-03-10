import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { BrandHeroPanel } from "@/components/brand/brand-hero-panel";
import { ShimmerBarScene } from "@/components/shimmer-bar-scene";
import { buttonStyles } from "@/components/ui/button";
import { getServerI18n } from "@/lib/server-i18n";

export async function HeroSection() {
  const { t } = await getServerI18n();

  return (
    <section className="relative overflow-hidden px-6 py-20 sm:py-28">
      <ShimmerBarScene className="-z-10 opacity-60" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(239,210,152,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(74,96,148,0.18),transparent_30%)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-stretch">
        <div className="flex h-full items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <Sparkles className="size-4 text-[color:var(--accent-strong)]" />
              {t("brand.heroLabel")}
            </div>
            <div className="space-y-6">
              <h1 className="max-w-4xl font-[family:var(--font-serif)] text-5xl leading-[1.02] text-[color:var(--text-strong)] sm:text-6xl lg:text-7xl">
                {t("home.hero.headline")}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
                {t("home.hero.description")}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/generator" className={buttonStyles({ variant: "secondary", size: "lg" })}>
                {t("home.hero.generateCta")}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/templates"
                className={buttonStyles({ variant: "outline", size: "lg" })}
              >
                {t("home.hero.browseCta")}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex h-full items-center justify-center">
          <BrandHeroPanel />
        </div>
      </div>
    </section>
  );
}
