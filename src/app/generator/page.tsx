import Link from "next/link";
import { ArrowUpRight, FileText, ScrollText, Sparkles } from "lucide-react";

import { PromptGeneratorForm } from "@/components/generator/prompt-generator-form";
import { SectionHeading } from "@/components/section-heading";
import { ShimmerBarScene } from "@/components/shimmer-bar-scene";
import { buttonStyles } from "@/components/ui/button";
import { getServerI18n } from "@/lib/server-i18n";
import { getFeaturedTemplates } from "@/server/services/template-service";

export async function generateMetadata() {
  const { t } = await getServerI18n();
  return {
    title: t("meta.generatorTitle"),
  };
}

export default async function GeneratorPage() {
  const featuredTemplates = await getFeaturedTemplates(4);
  const { t } = await getServerI18n();
  const workflowSteps = [
    {
      icon: FileText,
      label: t("generator.requestLabel"),
    },
    {
      icon: ScrollText,
      label: t("generator.factsLabel"),
    },
    {
      icon: Sparkles,
      label: t("generator.outputTitle"),
    },
  ];

  return (
    <div className="relative overflow-hidden px-6 py-14 sm:py-16 xl:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(198,212,255,0.12),transparent_58%)]" />
      <div className="page-shell space-y-10">
        <section className="relative overflow-hidden rounded-[38px] border border-[color:var(--border-strong)] bg-[linear-gradient(145deg,rgba(8,11,18,0.98),rgba(11,16,27,0.94)_55%,rgba(17,28,48,0.9))] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.42)] sm:p-8 xl:p-10">
          <ShimmerBarScene className="absolute inset-0 opacity-35 [mask-image:linear-gradient(135deg,rgba(0,0,0,0.12),rgba(0,0,0,1)_32%,rgba(0,0,0,0.18))]" />
          <div className="relative grid gap-8 2xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] 2xl:items-center">
            <div className="flex h-full min-w-0 items-center">
              <div className="space-y-5">
                <SectionHeading
                  eyebrow={t("generator.pageEyebrow", { brand: t("brand.name") })}
                  title={t("generator.pageTitle")}
                  description={t("generator.pageDescription")}
                />
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                    {t("generator.pageHelperBadge")}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[color:var(--muted-strong)]">
                    {t("generator.pageHelperText")}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid h-full min-w-0 gap-4">
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                <div className="grid gap-3 sm:grid-cols-3">
                  {workflowSteps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.label}
                        className="flex items-center gap-3 rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4"
                      >
                        <div className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-white/45">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="text-sm font-medium text-[color:var(--text-strong)]">
                            {step.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Link
                href="/templates"
                className={buttonStyles({
                  variant: "outline",
                  className:
                    "w-full justify-between border-white/10 bg-white/[0.03] px-5 py-4 text-left text-[color:var(--text-strong)] hover:border-[color:var(--accent-border)] hover:bg-white/8 sm:w-auto",
                })}
              >
                {t("generator.browseTemplates")}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <PromptGeneratorForm featuredTemplates={featuredTemplates} />
      </div>
    </div>
  );
}
