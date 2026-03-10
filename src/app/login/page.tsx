import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { ShimmerBarScene } from "@/components/shimmer-bar-scene";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getServerI18n } from "@/lib/server-i18n";

export async function generateMetadata() {
  const { t } = await getServerI18n();
  return {
    title: t("meta.loginTitle"),
  };
}

export default async function LoginPage() {
  const session = await auth();
  const { t } = await getServerI18n();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative overflow-hidden px-6 py-16 sm:py-24">
      <ShimmerBarScene className="-z-10 opacity-45" />
      <div className="page-shell relative grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {t("auth.login.eyebrow", { brand: t("brand.name") })}
          </p>
          <h1 className="font-[family:var(--font-serif)] text-5xl leading-tight text-[color:var(--text-strong)]">
            {t("auth.login.pageTitle", { brand: t("brand.name") })}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
            {t("auth.login.pageDescription")}
          </p>
          <DisclaimerBanner />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t("auth.login.cardTitle")}</CardTitle>
            <CardDescription>
              {t("auth.login.cardDescription", { brand: t("brand.name") })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
