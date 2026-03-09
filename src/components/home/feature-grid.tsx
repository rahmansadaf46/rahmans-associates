import { FileText, LibraryBig, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Structured Prompt Generation",
    description:
      "Convert a quick client instruction into a well-formed AI prompt with Bangladesh legal context, drafting sections, and placeholder logic.",
    icon: FileText,
  },
  {
    title: "Template Library",
    description:
      "Start from curated templates for notices, petitions, agreements, bail, research, and client interviews.",
    icon: LibraryBig,
  },
  {
    title: "Safer Legal Workflow",
    description:
      "Server-side OpenAI integration, protected history, prompt injection resistance, and clear drafting-only disclaimers.",
    icon: ShieldCheck,
  },
];

export function FeatureGrid() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-8">
        <SectionHeading
          eyebrow="Core Features"
          title="A practical legal drafting assistant, not a toy demo."
          description="The MVP is designed for real advocate workflows: structured inputs, saved prompt history, reusable templates, and secure server-side AI calls."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[color:var(--soft-panel)] text-[color:var(--accent-deep)]">
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
