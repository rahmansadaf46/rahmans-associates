import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Landmark, Scale } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getServerI18n } from "@/lib/server-i18n";

export async function generateMetadata() {
  const { t } = await getServerI18n();

  return {
    title: t("meta.rahmansAssociatesTitle"),
    description: t("rahmansAssociates.pageDescription"),
  };
}

export default async function RahmansAssociatesPage() {
  const [{ t }, { t: tEn }, { t: tBn }] = await Promise.all([
    getServerI18n(),
    getServerI18n("en"),
    getServerI18n("bn"),
  ]);

  const stats = [
    {
      value: t("rahmansAssociates.stats.studyValue"),
      label: t("rahmansAssociates.stats.studyLabel"),
    },
    {
      value: t("rahmansAssociates.stats.serviceValue"),
      label: t("rahmansAssociates.stats.serviceLabel"),
    },
    {
      value: t("rahmansAssociates.stats.retirementValue"),
      label: t("rahmansAssociates.stats.retirementLabel"),
    },
    {
      value: t("rahmansAssociates.stats.goalValue"),
      label: t("rahmansAssociates.stats.goalLabel"),
    },
  ];

  const educationItems = [
    {
      degree: t("rahmansAssociates.education.bscDegree"),
      institution: t("rahmansAssociates.education.bscInstitution"),
    },
    {
      degree: t("rahmansAssociates.education.mscDegree"),
      institution: t("rahmansAssociates.education.mscInstitution"),
    },
    {
      degree: t("rahmansAssociates.education.llbDegree"),
      institution: t("rahmansAssociates.education.llbInstitution"),
    },
  ];

  const timelineItems = [
    {
      period: t("rahmansAssociates.timeline.studyPeriod"),
      title: t("rahmansAssociates.timeline.studyTitle"),
      description: t("rahmansAssociates.timeline.studyDescription"),
    },
    {
      period: t("rahmansAssociates.timeline.servicePeriod"),
      title: t("rahmansAssociates.timeline.serviceTitle"),
      description: t("rahmansAssociates.timeline.serviceDescription"),
    },
    {
      period: t("rahmansAssociates.timeline.retirementPeriod"),
      title: t("rahmansAssociates.timeline.retirementTitle"),
      description: t("rahmansAssociates.timeline.retirementDescription"),
    },
    {
      period: t("rahmansAssociates.timeline.currentPeriod"),
      title: t("rahmansAssociates.timeline.currentTitle"),
      description: t("rahmansAssociates.timeline.currentDescription"),
    },
  ];

  const profileCards = [
    {
      icon: BriefcaseBusiness,
      title: t("rahmansAssociates.service.title"),
      description: t("rahmansAssociates.service.description"),
    },
    {
      icon: Scale,
      title: t("rahmansAssociates.journey.title"),
      description: t("rahmansAssociates.journey.description"),
    },
  ];

  return (
    <div className="relative overflow-hidden px-6 py-14 sm:py-16 xl:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(225,190,126,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(115,143,184,0.16),transparent_30%)]" />
      <div className="page-shell relative space-y-10">
        <section className="overflow-hidden rounded-[40px] border border-[color:var(--border-strong)] bg-[linear-gradient(145deg,rgba(7,10,16,0.98),rgba(12,18,29,0.96)_56%,rgba(23,37,63,0.88))] shadow-[0_42px_120px_rgba(0,0,0,0.38)]">
          <div className="grid gap-8 p-6 sm:p-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.92fr)] xl:p-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/60">
                  {t("rahmansAssociates.heroLabel")}
                </span>
                <span className="rounded-full border border-[color:var(--accent-border)] bg-[color:var(--soft-panel-strong)] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent-strong)]">
                  {t("rahmansAssociates.pageEyebrow")}
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">
                  {t("brand.name")}
                </p>
                <h1 className="max-w-4xl font-[family:var(--font-serif)] text-4xl leading-[1.04] text-[color:var(--text-strong)] sm:text-5xl xl:text-6xl">
                  {t("rahmansAssociates.pageTitle")}
                </h1>
                <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
                  {t("rahmansAssociates.pageDescription")}
                </p>
              </div>

              <Card className="border-white/10 bg-white/[0.03]">
                <CardContent className="p-6">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                    {t("rahmansAssociates.profileTitle")}
                  </p>
                  <p className="mt-4 text-sm leading-8 text-[color:var(--muted-strong)] sm:text-base">
                    {t("rahmansAssociates.profileText")}
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/generator"
                  className={buttonStyles({
                    variant: "secondary",
                    size: "lg",
                  })}
                >
                  {t("rahmansAssociates.cta.primary")}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/templates"
                  className={buttonStyles({
                    variant: "outline",
                    size: "lg",
                  })}
                >
                  {t("rahmansAssociates.cta.secondary")}
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="rounded-[30px] border border-[color:var(--accent-border)] bg-[radial-gradient(circle_at_top,rgba(230,195,126,0.22),transparent_44%),rgba(9,15,24,0.72)] p-8">
                  <div className="mx-auto flex aspect-[4/5] max-w-[16rem] items-center justify-center rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
                    <div className="text-center">
                      <p className="font-[family:var(--font-serif)] text-6xl text-[color:var(--accent-strong)]">
                        MSR
                      </p>
                      <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/45">
                        {t("rahmansAssociates.portraitLabel")}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-center text-sm leading-7 text-white/58">
                    {t("rahmansAssociates.portraitCaption")}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {stats.map((stat) => (
                  <Card
                    key={stat.label}
                    className="border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  >
                    <CardContent className="p-5">
                      <p className="font-[family:var(--font-serif)] text-3xl leading-none text-[color:var(--accent-strong)]">
                        {stat.value}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <Card className="border-[color:var(--border-strong)]">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <h2 className="font-[family:var(--font-serif)] text-3xl text-[color:var(--text-strong)]">
                    {t("rahmansAssociates.education.title")}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                    {t("rahmansAssociates.education.intro")}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {educationItems.map((item) => (
                  <div
                    key={item.degree}
                    className="rounded-[24px] border border-[color:var(--border)] bg-white/[0.03] p-5"
                  >
                    <p className="font-[family:var(--font-serif)] text-2xl text-[color:var(--text-strong)]">
                      {item.degree}
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[color:var(--muted)]">
                      {item.institution}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[color:var(--border-strong)]">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
                  <Landmark className="size-5" />
                </div>
                <div>
                  <h2 className="font-[family:var(--font-serif)] text-3xl text-[color:var(--text-strong)]">
                    {t("rahmansAssociates.timeline.title")}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                    {t("rahmansAssociates.timeline.intro")}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {timelineItems.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="mt-1 size-3 rounded-full bg-[color:var(--accent-strong)]" />
                      <span className="mt-2 h-full w-px bg-white/10" />
                    </div>
                    <div className="pb-4">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                        {item.period}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-[color:var(--text-strong)]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="grid gap-6">
            {profileCards.map((item) => (
              <Card key={item.title} className="border-[color:var(--border-strong)]">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[color:var(--soft-panel)] text-[color:var(--accent-strong)]">
                      <item.icon className="size-5" />
                    </div>
                    <div>
                      <h2 className="font-[family:var(--font-serif)] text-3xl text-[color:var(--text-strong)]">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-sm leading-8 text-[color:var(--muted)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-[color:var(--border-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="font-[family:var(--font-serif)] text-3xl text-[color:var(--text-strong)]">
                    {t("rahmansAssociates.philosophy.title")}
                  </h2>
                  <blockquote className="mt-4 border-l border-[color:var(--accent-border)] pl-5 font-[family:var(--font-serif)] text-3xl leading-tight text-[color:var(--text-strong)]">
                    {t("rahmansAssociates.philosophy.quote")}
                  </blockquote>
                  <p className="mt-4 text-sm leading-8 text-[color:var(--muted)]">
                    {t("rahmansAssociates.philosophy.explanation")}
                  </p>
                </div>

                <div className="rounded-[28px] border border-[color:var(--border)] bg-white/[0.03] p-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                    {t("rahmansAssociates.bilingual.title")}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                    {t("rahmansAssociates.bilingual.description")}
                  </p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                        {t("rahmansAssociates.bilingual.englishQuoteLabel")}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--muted-strong)]">
                        {tEn("rahmansAssociates.philosophy.quote")}
                      </p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                        {t("rahmansAssociates.bilingual.banglaQuoteLabel")}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--muted-strong)]">
                        {tBn("rahmansAssociates.bilingual.banglaQuote")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-[color:var(--accent-border)] bg-[color:var(--soft-panel-strong)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <h3 className="font-[family:var(--font-serif)] text-2xl text-[color:var(--text-strong)]">
                    {t("rahmansAssociates.cta.title")}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
                    {t("rahmansAssociates.cta.description")}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/generator"
                      className={buttonStyles({
                        variant: "secondary",
                      })}
                    >
                      {t("rahmansAssociates.cta.primary")}
                    </Link>
                    <Link
                      href="/templates"
                      className={buttonStyles({
                        variant: "outline",
                      })}
                    >
                      {t("rahmansAssociates.cta.secondary")}
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
