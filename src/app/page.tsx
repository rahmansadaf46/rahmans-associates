import { CategoryStrip } from "@/components/home/category-strip";
import { DemoPrompts } from "@/components/home/demo-prompts";
import { FeatureGrid } from "@/components/home/feature-grid";
import { FeaturedTemplateList } from "@/components/home/featured-template-list";
import { HeroSection } from "@/components/home/hero-section";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { getFeaturedTemplates } from "@/server/services/template-service";

export default async function Home() {
  const featuredTemplates = await getFeaturedTemplates(3);

  return (
    <>
      <HeroSection />
      <CategoryStrip />
      <div className="page-shell px-6 pb-8">
        <DisclaimerBanner />
      </div>
      <FeatureGrid />
      <FeaturedTemplateList templates={featuredTemplates} />
      <DemoPrompts />
    </>
  );
}
