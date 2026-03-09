import {
  Languages,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  BRAND_HERO_LABEL,
  BRAND_NAME,
  BRAND_TAGLINE,
  HOME_CATEGORY_HIGHLIGHTS,
} from "@/lib/constants";

const highlights = [
  {
    label: "Structured prompts",
    description: "Structures plain requests for legal drafting.",
    icon: Workflow,
  },
  {
    label: "Bangla + English",
    description: "Keeps bilingual intake clear and professional.",
    icon: Languages,
  },
  {
    label: "Advocate workflow",
    description: "Fits notices, petitions, agreements, and research.",
    icon: ShieldCheck,
  },
];

const proofPoints = [
  {
    value: HOME_CATEGORY_HIGHLIGHTS.length.toString().padStart(2, "0"),
    label: "Practice areas",
  },
  {
    value: "02",
    label: "Working languages",
  },
  {
    value: highlights.length.toString().padStart(2, "0"),
    label: "Core pillars",
  },
];

export function BrandHeroPanel() {
  return (
    <Card className="hero-brand-card relative overflow-hidden border-[color:var(--border-strong)] bg-[linear-gradient(160deg,rgba(10,22,38,0.98),rgba(18,40,69,0.92)_58%,rgba(28,58,96,0.82))] text-white">
      <CardContent className="relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(226,192,120,0.22),transparent_32%),radial-gradient(circle_at_100%_100%,rgba(116,143,183,0.18),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />

        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <Badge className="border-white/15 bg-white/10 text-white/80">
            {BRAND_HERO_LABEL}
          </Badge>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Sparkles className="size-4 text-[color:var(--accent-strong)]" />
            <span className="text-xs uppercase tracking-[0.22em]">
              Bangladesh counsel workflow
            </span>
          </div>
        </div>

        <div className="relative mt-8 grid items-center gap-8 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(226,192,120,0.24),transparent_68%)] blur-3xl" />
              <div className="relative rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_48px_rgba(4,10,19,0.28)]">
                <BrandMark size="lg" className="h-36 w-36 sm:h-40 sm:w-40" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/62">
                Brand signature
              </p>
              <h2 className="font-[family:var(--font-serif)] text-3xl leading-tight text-white sm:text-4xl">
                {BRAND_NAME}
              </h2>
              <p className="max-w-xl text-sm leading-6 text-white/74 sm:text-base">
                {BRAND_TAGLINE}. Premium drafting infrastructure, refined visual
                clarity, and dependable AI prompt workflows for Bangladesh-based
                legal practice.
              </p>
            </div>

            <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                  <div className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-[color:var(--accent-strong)]">
                    <item.icon className="size-4" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/66">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-8 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(125px,1fr))]">
          {proofPoints.map((item) => (
            <div
              key={item.label}
              className="rounded-[22px] border border-white/10 bg-[rgba(8,17,31,0.28)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              <p className="font-[family:var(--font-serif)] text-3xl leading-none text-[color:var(--accent-strong)]">
                {item.value}
              </p>
              <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/58">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
