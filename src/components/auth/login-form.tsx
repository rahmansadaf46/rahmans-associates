"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const callbackUrl = searchParams.get("next") ?? "/dashboard";
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
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
          toast.error("Invalid email or password.");
          return;
        }

        toast.success("Logged in successfully.");
        router.push(result?.url ?? callbackUrl);
        router.refresh();
      } catch {
        toast.error("Login failed due to a network or server issue.");
      }
    });
  });

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="field-shell">
        <label htmlFor="email" className="field-label">
          Email address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="advocate@example.com"
          autoComplete="email"
          {...form.register("email")}
        />
        {form.formState.errors.email ? (
          <p className="field-error">{form.formState.errors.email.message}</p>
        ) : null}
      </div>

      <div className="field-shell">
        <label htmlFor="password" className="field-label">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="current-password"
          {...form.register("password")}
        />
        {form.formState.errors.password ? (
          <p className="field-error">{form.formState.errors.password.message}</p>
        ) : null}
      </div>

      <Button type="submit" className="w-full" loading={isPending} loadingText="Signing in...">
        Login
      </Button>

      <p className="text-sm text-[color:var(--muted)]">
        Need an account?{" "}
        <Link href="/signup" className="font-semibold text-[color:var(--brand-ink)]">
          Create one
        </Link>
      </p>
    </form>
  );
}
