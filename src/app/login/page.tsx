import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { BRAND_NAME } from "@/lib/constants";

export const metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="px-6 py-16 sm:py-24">
      <div className="page-shell grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {BRAND_NAME} secure workspace
          </p>
          <h1 className="font-[family:var(--font-serif)] text-5xl leading-tight text-[color:var(--brand-ink)]">
            {`Access your ${BRAND_NAME} drafting workspace.`}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
            Login to manage previous generations, mark useful prompts as favorites,
            and keep a searchable drafting record for your Bangladesh legal workflow.
          </p>
          <DisclaimerBanner />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              {`Use your email and password to open the protected ${BRAND_NAME} dashboard.`}
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
