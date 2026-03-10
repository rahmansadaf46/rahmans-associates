import Link from "next/link";
import type { Session } from "next-auth";

import { SessionActions } from "@/components/auth/session-actions";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ShimmerBarScene } from "@/components/shimmer-bar-scene";
import { getServerI18n } from "@/lib/server-i18n";

export async function SiteHeader({ session }: { session: Session | null }) {
  const { t } = await getServerI18n();
  const navigation = [
    { href: "/", label: t("nav.home") },
    { href: "/generator", label: t("nav.generator") },
    { href: "/templates", label: t("nav.templates") },
    { href: "/rahmans-associates", label: t("nav.rahmansAssociates") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[rgba(6,9,16,0.82)] shadow-[0_18px_48px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-4">
        <ShimmerBarScene className="opacity-35" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="min-w-0">
              <BrandLockup name={t("brand.name")} tagline={t("brand.tagline")} />
            </Link>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <nav className="flex flex-wrap gap-2 text-sm font-medium text-[color:var(--muted-strong)]">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 transition hover:bg-white/6 hover:text-[color:var(--text-strong)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <LanguageSwitcher />
              <SessionActions isAuthenticated={Boolean(session?.user)} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
