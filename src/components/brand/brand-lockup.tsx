import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { BrandMark } from "@/components/brand/brand-mark";

type BrandLockupProps = {
  size?: "sm" | "md";
  className?: string;
  name?: string;
  showTagline?: boolean;
  tagline?: string;
};

export function BrandLockup({
  size = "sm",
  className,
  name = BRAND_NAME,
  showTagline = true,
  tagline = BRAND_TAGLINE,
}: BrandLockupProps) {
  const isSmall = size === "sm";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BrandMark size={isSmall ? "sm" : "md"} />
      <div className="min-w-0">
        <p
          className={cn(
            "truncate font-[family:var(--font-serif)] tracking-tight text-[color:var(--text-strong)]",
            isSmall ? "text-[1.75rem] leading-none" : "text-4xl leading-none",
          )}
        >
          {name}
        </p>
        {showTagline ? (
          <p
            className={cn(
              "truncate uppercase tracking-[0.22em] text-[color:var(--muted)]",
              isSmall ? "mt-1 text-[0.62rem]" : "mt-2 text-xs",
            )}
          >
            {tagline}
          </p>
        ) : null}
      </div>
    </div>
  );
}
