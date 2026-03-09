import { cn } from "@/lib/utils";

type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
};

const sizeClasses = {
  sm: {
    scene: "h-12 w-12",
    plate: "rounded-[18px]",
    glyph: "text-lg",
    detail: "inset-1 rounded-[14px]",
  },
  md: {
    scene: "h-20 w-20",
    plate: "rounded-[26px]",
    glyph: "text-2xl",
    detail: "inset-1.5 rounded-[20px]",
  },
  lg: {
    scene: "h-44 w-44 sm:h-52 sm:w-52",
    plate: "rounded-[38px]",
    glyph: "text-5xl sm:text-6xl",
    detail: "inset-2 rounded-[30px]",
  },
} as const;

export function BrandMark({
  size = "md",
  animated = true,
  className,
}: BrandMarkProps) {
  const classes = sizeClasses[size];

  return (
    <div className={cn("brand-mark-scene", classes.scene, className)}>
      <div className={cn("brand-mark-core", animated && "brand-mark-float")}>
        <div className={cn("brand-mark-shadow", classes.plate)} />
        <div className={cn("brand-mark-plate", classes.plate)}>
          <div className={cn("brand-mark-inner", classes.detail)}>
            <div className="brand-mark-grid" />
            <div className="brand-mark-column" />
            <div className="brand-mark-balance" />
            <div
              className={cn(
                "brand-mark-glyph font-[family:var(--font-serif)]",
                classes.glyph,
              )}
            >
              RA
            </div>
            <div className="brand-mark-shine" />
          </div>
        </div>
        <div className="brand-mark-orb brand-mark-orb-top" />
        <div className="brand-mark-orb brand-mark-orb-bottom" />
      </div>
    </div>
  );
}
