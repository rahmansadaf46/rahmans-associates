import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", align === "center" && "text-center")}>
      <Badge className={align === "center" ? "mx-auto" : undefined}>
        {eyebrow}
      </Badge>
      <div className="space-y-3">
        <h2 className="font-[family:var(--font-serif)] text-4xl leading-tight text-[color:var(--brand-ink)] sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)] sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
