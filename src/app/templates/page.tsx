import { SectionHeading } from "@/components/section-heading";
import { TemplateLibrary } from "@/components/templates/template-library";
import { getServerI18n } from "@/lib/server-i18n";
import { getPublishedTemplates } from "@/server/services/template-service";

export async function generateMetadata() {
  const { t } = await getServerI18n();
  return {
    title: t("meta.templatesTitle"),
  };
}

export default async function TemplatesPage() {
  const templates = await getPublishedTemplates();
  const { t } = await getServerI18n();

  return (
    <div className="px-6 py-16 sm:py-20">
      <div className="page-shell space-y-10">
        <SectionHeading
          eyebrow={t("templates.pageEyebrow", { brand: t("brand.name") })}
          title={t("templates.pageTitle")}
          description={t("templates.pageDescription")}
        />
        <TemplateLibrary templates={templates} />
      </div>
    </div>
  );
}
