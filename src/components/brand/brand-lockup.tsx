import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { BrandMark } from "@/components/brand/brand-mark";

type BrandLockupProps = {
  size?: "sm" | "md";
  className?: string;
  showTagline?: boolean;
};

export function BrandLockup({
  size = "sm",
  className,
  showTagline = true,
}: BrandLockupProps) {
  const isSmall = size === "sm";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BrandMark size={isSmall ? "sm" : "md"} />
      <div className="min-w-0">
        <p
          className={cn(
            "truncate font-[family:var(--font-serif)] tracking-tight text-[color:var(--brand-panel)]",
            isSmall ? "text-[1.75rem] leading-none" : "text-4xl leading-none",
          )}
        >
          {BRAND_NAME}
        </p>
        {showTagline ? (
          <p
            className={cn(
              "truncate uppercase tracking-[0.22em] text-[color:var(--muted-strong)]",
              isSmall ? "mt-1 text-[0.62rem]" : "mt-2 text-xs",
            )}
          >
            {BRAND_TAGLINE}
          </p>
        ) : null}
      </div>
    </div>
  );
}
