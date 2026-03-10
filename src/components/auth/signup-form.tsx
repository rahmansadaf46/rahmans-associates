"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useTranslations } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRegisterSchema, type RegisterValues } from "@/lib/validations/auth";

export function SignupForm() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const callbackUrl = searchParams.get("next") ?? "/dashboard";
  const form = useForm<RegisterValues>({
    resolver: zodResolver(getRegisterSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        if (!response.ok) {
          toast.error(payload?.error ?? t("auth.signup.failed"));
          return;
        }

        const signInResult = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
          callbackUrl,
        });

        if (signInResult?.error) {
          toast.success(t("auth.signup.createdLogin"));
          router.push("/login");
          return;
        }

        toast.success(t("auth.signup.createdSuccess"));
        router.push(signInResult?.url ?? callbackUrl);
        router.refresh();
      } catch {
        toast.error(t("auth.signup.networkError"));
      }
    });
  });

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="field-shell">
        <label htmlFor="name" className="field-label">
          {t("auth.signup.nameLabel")}
        </label>
        <Input
          id="name"
          placeholder={t("auth.signup.namePlaceholder")}
          autoComplete="name"
          {...form.register("name")}
        />
        {form.formState.errors.name ? (
          <p className="field-error">{form.formState.errors.name.message}</p>
        ) : null}
      </div>

      <div className="field-shell">
        <label htmlFor="email" className="field-label">
          {t("auth.signup.emailLabel")}
        </label>
        <Input
          id="email"
          type="email"
          placeholder={t("auth.signup.emailPlaceholder")}
          autoComplete="email"
          {...form.register("email")}
        />
        {form.formState.errors.email ? (
          <p className="field-error">{form.formState.errors.email.message}</p>
        ) : null}
      </div>

      <div className="field-shell">
        <label htmlFor="password" className="field-label">
          {t("auth.signup.passwordLabel")}
        </label>
        <Input
          id="password"
          type="password"
          placeholder={t("auth.signup.passwordPlaceholder")}
          autoComplete="new-password"
          {...form.register("password")}
        />
        {form.formState.errors.password ? (
          <p className="field-error">{form.formState.errors.password.message}</p>
        ) : null}
      </div>

      <Button
        type="submit"
        className="w-full"
        variant="secondary"
        loading={isPending}
        loadingText={t("auth.signup.loading")}
      >
        {t("auth.signup.submit")}
      </Button>

      <p className="text-sm text-[color:var(--muted)]">
        {t("auth.signup.alreadyRegistered")}{" "}
        <Link href="/login" className="font-semibold text-[color:var(--text-strong)]">
          {t("auth.signup.loginHere")}
        </Link>
      </p>
    </form>
  );
}
