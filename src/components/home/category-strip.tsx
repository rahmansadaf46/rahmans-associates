import { getHomeCategoryHighlights } from "@/lib/prompt-options";
import { getServerI18n } from "@/lib/server-i18n";

export async function CategoryStrip() {
  const { t } = await getServerI18n();
  const categories = getHomeCategoryHighlights(t);

  return (
    <section className="px-6 pb-8">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap gap-3">
        {categories.map((category) => (
          <div
            key={category.value}
            className="rounded-full border border-[color:var(--border)] bg-white/6 px-4 py-2 text-sm font-medium text-[color:var(--muted-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            {category.label}
          </div>
        ))}
      </div>
    </section>
  );
}
