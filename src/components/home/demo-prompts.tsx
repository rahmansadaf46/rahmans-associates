import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDemoGeneratedPrompts } from "@/lib/demo-content";
import { getServerI18n } from "@/lib/server-i18n";

export async function DemoPrompts() {
  const { locale, t } = await getServerI18n();
  const demoGeneratedPrompts = getDemoGeneratedPrompts(locale);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-8">
        <SectionHeading
          eyebrow={t("home.demo.eyebrow")}
          title={t("home.demo.title")}
          description={t("home.demo.description")}
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
