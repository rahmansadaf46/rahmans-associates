import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { BrandHeroPanel } from "@/components/brand/brand-hero-panel";
import { HeroSignalLine } from "@/components/home/hero-signal-line";
import { ShimmerBarScene } from "@/components/shimmer-bar-scene";
import { buttonStyles } from "@/components/ui/button";
import { getServerI18n } from "@/lib/server-i18n";

export async function HeroSection() {
  const { t } = await getServerI18n();
  const reassuranceItems = [
    {
      title: t("home.hero.reassurance.plainLanguage.title"),
      description: t("home.hero.reassurance.plainLanguage.description"),
    },
    {
      title: t("home.hero.reassurance.language.title"),
      description: t("home.hero.reassurance.language.description"),
    },
    {
      title: t("home.hero.reassurance.structure.title"),
      description: t("home.hero.reassurance.structure.description"),
    },
  ];
  const signalLines = [
    t("home.hero.signalLines.first"),
    t("home.hero.signalLines.second"),
    t("home.hero.signalLines.third"),
  ];

  return (
    <section className="relative overflow-hidden px-6 py-16 sm:py-20 xl:py-24 2xl:py-28">
      <ShimmerBarScene className="-z-10 opacity-60" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(239,210,152,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(74,96,148,0.18),transparent_30%)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 2xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] 2xl:items-center">
        <div className="flex h-full min-w-0 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <Sparkles className="size-4 text-[color:var(--accent-strong)]" />
              {t("brand.heroLabel")}
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance font-[family:var(--font-serif)] text-4xl leading-[1.04] text-[color:var(--text-strong)] sm:text-5xl lg:text-6xl 2xl:text-7xl">
                {t("home.hero.headline")}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)] sm:text-lg sm:leading-8">
                {t("home.hero.description")}
              </p>
              <HeroSignalLine
                key={signalLines.join("|")}
                label={t("home.hero.signalLabel")}
                lines={signalLines}
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/generator"
                className={buttonStyles({
                  variant: "secondary",
                  size: "lg",
                  className: "w-full sm:w-auto",
                })}
              >
                {t("home.hero.generateCta")}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/templates"
                className={buttonStyles({
                  variant: "outline",
                  size: "lg",
                  className: "w-full sm:w-auto",
                })}
              >
                {t("home.hero.browseCta")}
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {reassuranceItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  <p className="text-sm font-semibold text-[color:var(--text-strong)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-full min-w-0 items-center justify-center">
          <BrandHeroPanel />
        </div>
      </div>
    </section>
  );
}
