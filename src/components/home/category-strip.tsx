import { HOME_CATEGORY_HIGHLIGHTS } from "@/lib/constants";

export function CategoryStrip() {
  return (
    <section className="px-6 pb-8">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap gap-3">
        {HOME_CATEGORY_HIGHLIGHTS.map((category) => (
          <div
            key={category.value}
            className="rounded-full border border-[color:var(--border)] bg-white/70 px-4 py-2 text-sm font-medium text-[color:var(--brand-ink)]"
          >
            {category.label}
          </div>
        ))}
      </div>
    </section>
  );
}
