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
import { getLoginSchema, type LoginValues } from "@/lib/validations/auth";

export function LoginForm() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const callbackUrl = searchParams.get("next") ?? "/dashboard";
  const form = useForm<LoginValues>({
    resolver: zodResolver(getLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      try {
        const result = await signIn("credentials", {
          ...values,
          redirect: false,
          callbackUrl,
        });

        if (result?.error) {
          toast.error(t("auth.login.invalidCredentials"));
          return;
        }

        toast.success(t("auth.login.success"));
        router.push(result?.url ?? callbackUrl);
        router.refresh();
      } catch {
        toast.error(t("auth.login.networkError"));
      }
    });
  });

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="field-shell">
        <label htmlFor="email" className="field-label">
          {t("auth.login.emailLabel")}
        </label>
        <Input
          id="email"
          type="email"
          placeholder={t("auth.login.emailPlaceholder")}
          autoComplete="email"
          {...form.register("email")}
        />
        {form.formState.errors.email ? (
          <p className="field-error">{form.formState.errors.email.message}</p>
        ) : null}
      </div>

      <div className="field-shell">
        <label htmlFor="password" className="field-label">
          {t("auth.login.passwordLabel")}
        </label>
        <Input
          id="password"
          type="password"
          placeholder={t("auth.login.passwordPlaceholder")}
          autoComplete="current-password"
          {...form.register("password")}
        />
        {form.formState.errors.password ? (
          <p className="field-error">{form.formState.errors.password.message}</p>
        ) : null}
      </div>

      <Button
        type="submit"
        className="w-full"
        loading={isPending}
        loadingText={t("auth.login.loading")}
      >
        {t("auth.login.submit")}
      </Button>

      <p className="text-sm text-[color:var(--muted)]">
        {t("auth.login.needAccount")}{" "}
        <Link href="/signup" className="font-semibold text-[color:var(--text-strong)]">
          {t("auth.login.createOne")}
        </Link>
      </p>
    </form>
  );
}
