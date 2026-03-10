import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { getServerI18n } from "@/lib/server-i18n";

export default async function NotFound() {
  const { t } = await getServerI18n();

  return (
    <div className="px-6 py-24">
      <div className="page-shell rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)] p-10 text-center shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
          {t("notFound.code")}
        </p>
        <h1 className="mt-4 font-[family:var(--font-serif)] text-5xl text-[color:var(--text-strong)]">
          {t("notFound.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
          {t("notFound.description", { brand: t("brand.name") })}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className={buttonStyles()}>
            {t("notFound.returnHome")}
          </Link>
          <Link href="/templates" className={buttonStyles({ variant: "outline" })}>
            {t("notFound.browseTemplates")}
          </Link>
        </div>
      </div>
    </div>
  );
}
