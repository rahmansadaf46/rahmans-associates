import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[color:var(--border-strong)] bg-[rgba(255,255,255,0.72)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.52)]",
        className,
      )}
      {...props}
    />
  );
}
