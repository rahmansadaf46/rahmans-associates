"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import { Button, buttonStyles } from "@/components/ui/button";

type SessionActionsProps = {
  isAuthenticated: boolean;
};

export function SessionActions({ isAuthenticated }: SessionActionsProps) {
  if (!isAuthenticated) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/login" className={buttonStyles({ variant: "outline", size: "sm" })}>
          Login
        </Link>
        <Link href="/signup" className={buttonStyles({ variant: "secondary", size: "sm" })}>
          Create Account
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
        Dashboard
      </Link>
      <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
        Sign Out
      </Button>
    </div>
  );
}
