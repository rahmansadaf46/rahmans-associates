import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 text-sm text-[color:var(--brand-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent-border)] focus:bg-white focus:ring-4 focus:ring-[color:var(--focus-ring)] disabled:bg-[color:var(--button-disabled-surface)] disabled:text-[color:var(--button-disabled-text)]",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";
