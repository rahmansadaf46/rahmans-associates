import { redirect } from "next/navigation";

import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { SectionHeading } from "@/components/section-heading";
import { auth } from "@/lib/auth";
import { BRAND_NAME } from "@/lib/constants";
import { getDashboardData } from "@/server/services/dashboard-service";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/dashboard");
  }

  const { prompts } = await getDashboardData(session.user.id);

  return (
    <div className="px-6 py-16 sm:py-20">
      <div className="page-shell space-y-10">
        <SectionHeading
          eyebrow={`${BRAND_NAME} Dashboard`}
          title="Review saved prompts, favorites, and your drafting trail."
          description={`Every signed-in generation is stored in PostgreSQL so you can search previous work, reuse useful prompts, and maintain a consistent ${BRAND_NAME} drafting workflow.`}
        />
        <DashboardClient initialPrompts={prompts} />
      </div>
    </div>
  );
}
