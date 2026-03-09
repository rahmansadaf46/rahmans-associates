import { SectionHeading } from "@/components/section-heading";
import { BRAND_NAME } from "@/lib/constants";
import { TemplateLibrary } from "@/components/templates/template-library";
import { getPublishedTemplates } from "@/server/services/template-service";

export const metadata = {
  title: "Prompt Templates",
};

export default async function TemplatesPage() {
  const templates = await getPublishedTemplates();

  return (
    <div className="px-6 py-16 sm:py-20">
      <div className="page-shell space-y-10">
        <SectionHeading
          eyebrow={`${BRAND_NAME} Template Vault`}
          title="Ready-made Bangladesh legal prompt templates."
          description="Search, filter, copy, and open seeded templates covering criminal, civil, family, property, commercial, labour, writ, banking, cyber, notice, and contract workflows."
        />
        <TemplateLibrary templates={templates} />
      </div>
    </div>
  );
}
