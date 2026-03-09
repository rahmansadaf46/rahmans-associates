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
import { registerSchema, type RegisterValues } from "@/lib/validations/auth";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const callbackUrl = searchParams.get("next") ?? "/dashboard";
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
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
          toast.error(payload?.error ?? "Account creation failed.");
          return;
        }

        const signInResult = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
          callbackUrl,
        });

        if (signInResult?.error) {
          toast.success("Account created. Please log in.");
          router.push("/login");
          return;
        }

        toast.success("Account created successfully.");
        router.push(signInResult?.url ?? callbackUrl);
        router.refresh();
      } catch {
        toast.error("Account creation failed due to a network or server issue.");
      }
    });
  });

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="field-shell">
        <label htmlFor="name" className="field-label">
          Full name
        </label>
        <Input
          id="name"
          placeholder="Advocate Md. Saidur Rahman"
          autoComplete="name"
          {...form.register("name")}
        />
        {form.formState.errors.name ? (
          <p className="field-error">{form.formState.errors.name.message}</p>
        ) : null}
      </div>

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
          placeholder="Use at least 8 characters"
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
        loadingText="Creating account..."
      >
        Create Account
      </Button>

      <p className="text-sm text-[color:var(--muted)]">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-[color:var(--brand-ink)]">
          Login here
        </Link>
      </p>
    </form>
  );
}
