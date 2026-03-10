import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { getServerI18n } from "@/lib/server-i18n";

export async function SiteFooter() {
  const { t } = await getServerI18n();

  return (
    <footer className="border-t border-white/8 bg-[rgba(5,7,12,0.84)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <BrandLockup
            name={t("brand.name")}
            showTagline={false}
            tagline={t("brand.tagline")}
          />
          <p className="max-w-3xl text-sm uppercase tracking-[0.18em] text-[color:var(--muted-strong)]">
            {t("footer.tagline")}
          </p>
          <p className="max-w-3xl text-sm leading-7 text-[color:var(--muted)]">
            {t("disclaimer.text")}
          </p>
        </div>
        <div className="grid gap-3 text-sm text-[color:var(--muted-strong)]">
          <Link href="/" className="transition hover:text-[color:var(--text-strong)]">
            {t("nav.home")}
          </Link>
          <Link
            href="/generator"
            className="transition hover:text-[color:var(--text-strong)]"
          >
            {t("footer.generator")}
          </Link>
          <Link
            href="/templates"
            className="transition hover:text-[color:var(--text-strong)]"
          >
            {t("footer.templates")}
          </Link>
          <Link
            href="/dashboard"
            className="transition hover:text-[color:var(--text-strong)]"
          >
            {t("footer.dashboard")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
