import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoGeneratedPrompts } from "@/lib/demo-content";

export function DemoPrompts() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-8">
        <SectionHeading
          eyebrow="Demo Output"
          title="See the style of prompt the generator produces."
          description="These examples show how plain-language requests become structured, context-aware prompts for Bangladesh legal drafting and research."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {demoGeneratedPrompts.map((prompt) => (
            <Card key={prompt.title}>
              <CardHeader>
                <CardTitle className="text-3xl">{prompt.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-[color:var(--muted)]">
                  {prompt.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
