import { redirect } from "next/navigation";

import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { SectionHeading } from "@/components/section-heading";
import { auth } from "@/lib/auth";
import { getServerI18n } from "@/lib/server-i18n";
import { getDashboardData } from "@/server/services/dashboard-service";

export async function generateMetadata() {
  const { t } = await getServerI18n();
  return {
    title: t("meta.dashboardTitle"),
  };
}

export default async function DashboardPage() {
  const session = await auth();
  const { t } = await getServerI18n();

  if (!session?.user) {
    redirect("/login?next=/dashboard");
  }

  const { prompts } = await getDashboardData(session.user.id);

  return (
    <div className="px-6 py-16 sm:py-20">
      <div className="page-shell space-y-10">
        <SectionHeading
          eyebrow={t("dashboard.pageEyebrow", { brand: t("brand.name") })}
          title={t("dashboard.pageTitle")}
          description={t("dashboard.pageDescription", { brand: t("brand.name") })}
        />
        <DashboardClient initialPrompts={prompts} />
      </div>
    </div>
  );
}
