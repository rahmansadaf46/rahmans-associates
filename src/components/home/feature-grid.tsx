import { FileText, LibraryBig, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerI18n } from "@/lib/server-i18n";

export async function FeatureGrid() {
  const { t } = await getServerI18n();
  const features = [
    {
      title: t("home.features.structuredTitle"),
      description: t("home.features.structuredDescription"),
      icon: FileText,
    },
    {
      title: t("home.features.libraryTitle"),
      description: t("home.features.libraryDescription"),
      icon: LibraryBig,
    },
    {
      title: t("home.features.workflowTitle"),
      description: t("home.features.workflowDescription"),
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-8">
        <SectionHeading
          eyebrow={t("home.features.eyebrow")}
          title={t("home.features.title")}
          description={t("home.features.description")}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-[color:var(--accent-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <feature.icon className="size-5" />
                </div>
                <CardTitle className="text-3xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-[color:var(--muted)]">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
