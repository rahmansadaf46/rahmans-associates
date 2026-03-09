import { PromptGeneratorForm } from "@/components/generator/prompt-generator-form";
import { SectionHeading } from "@/components/section-heading";
import { BRAND_NAME } from "@/lib/constants";
import { getFeaturedTemplates } from "@/server/services/template-service";

export const metadata = {
  title: "Prompt Generator",
};

export default async function GeneratorPage() {
  const featuredTemplates = await getFeaturedTemplates(4);

  return (
    <div className="px-6 py-16 sm:py-20">
      <div className="page-shell space-y-10">
        <SectionHeading
          eyebrow={`${BRAND_NAME} Prompt Lab`}
          title="Build a better legal AI prompt from one plain request."
          description="Select the legal category, prompt type, optional facts, and output language. The final prompt stays focused on Bangladeshi legal drafting, research, and court-ready professional structure."
        />
        <PromptGeneratorForm featuredTemplates={featuredTemplates} />
      </div>
    </div>
  );
}
