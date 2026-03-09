import Link from "next/link";
import type { Session } from "next-auth";

import { SessionActions } from "@/components/auth/session-actions";
import { BrandLockup } from "@/components/brand/brand-lockup";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/generator", label: "Generator" },
  { href: "/templates", label: "Templates" },
];

export function SiteHeader({ session }: { session: Session | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[rgba(248,243,235,0.88)] shadow-[0_10px_30px_rgba(10,22,38,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="min-w-0">
            <BrandLockup />
          </Link>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
          <nav className="flex flex-wrap gap-2 text-sm font-medium text-[color:var(--muted-strong)]">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 transition hover:bg-[color:var(--button-ghost-bg)] hover:text-[color:var(--brand-panel)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <SessionActions isAuthenticated={Boolean(session?.user)} />
        </div>
      </div>
    </header>
  );
}
