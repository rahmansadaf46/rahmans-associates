import * as React from "react";

import { cn } from "@/lib/utils";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-12 w-full appearance-none rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 text-sm text-[color:var(--text-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition focus:border-[color:var(--accent-border)] focus:bg-[rgba(14,20,32,0.98)] focus:ring-4 focus:ring-[color:var(--focus-ring)] disabled:bg-[color:var(--button-disabled-surface)] disabled:text-[color:var(--button-disabled-text)]",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));

Select.displayName = "Select";
