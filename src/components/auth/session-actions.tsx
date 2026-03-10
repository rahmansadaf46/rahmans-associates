"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import { useTranslations } from "@/components/i18n-provider";
import { Button, buttonStyles } from "@/components/ui/button";

type SessionActionsProps = {
  isAuthenticated: boolean;
};

export function SessionActions({ isAuthenticated }: SessionActionsProps) {
  const t = useTranslations();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/login" className={buttonStyles({ variant: "outline", size: "sm" })}>
          {t("nav.login")}
        </Link>
        <Link href="/signup" className={buttonStyles({ variant: "secondary", size: "sm" })}>
          {t("nav.createAccount")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/dashboard"
        className={buttonStyles({ variant: "secondary", size: "sm" })}
      >
        {t("nav.dashboard")}
      </Link>
      <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
        {t("nav.signOut")}
      </Button>
    </div>
  );
}
