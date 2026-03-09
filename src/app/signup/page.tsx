import { redirect } from "next/navigation";

import { SignupForm } from "@/components/auth/signup-form";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { BRAND_NAME } from "@/lib/constants";

export const metadata = {
  title: "Create Account",
};

export default async function SignupPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="px-6 py-16 sm:py-24">
      <div className="page-shell grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            Join {BRAND_NAME}
          </p>
          <h1 className="font-[family:var(--font-serif)] text-5xl leading-tight text-[color:var(--brand-ink)]">
            Create an account to save and organize premium legal drafting prompts.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
            The app supports guest generation, but signed-in users can keep prompt
            history, search past work, and mark favorites for later drafting.
          </p>
          <DisclaimerBanner />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Register for {BRAND_NAME}. Passwords are stored as secure hashes in
              PostgreSQL.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
