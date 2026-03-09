import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-[color:var(--brand-panel)] bg-[linear-gradient(135deg,var(--brand-panel),var(--brand-panel-strong))] text-[color:var(--button-primary-text)] shadow-[0_18px_40px_rgba(8,17,31,0.22)] hover:border-[color:var(--brand-panel-strong)] hover:bg-[linear-gradient(135deg,var(--brand-panel-strong),#173459)] active:translate-y-px active:shadow-[0_10px_20px_rgba(8,17,31,0.18)] disabled:border-transparent disabled:bg-[color:var(--button-disabled-bg)] disabled:text-[color:var(--button-disabled-text)] disabled:shadow-none",
  secondary:
    "border border-[color:var(--accent-border)] bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] text-[color:var(--button-secondary-text)] shadow-[0_14px_32px_rgba(187,145,63,0.22)] hover:border-[color:var(--accent-border-strong)] hover:brightness-[1.03] active:translate-y-px active:shadow-[0_8px_18px_rgba(187,145,63,0.18)] disabled:border-transparent disabled:bg-[color:var(--button-disabled-bg)] disabled:text-[color:var(--button-disabled-text)] disabled:shadow-none",
  outline:
    "border border-[color:var(--border-strong)] bg-[color:var(--button-outline-bg)] text-[color:var(--button-outline-text)] shadow-[0_10px_24px_rgba(12,26,51,0.08)] hover:border-[color:var(--brand-panel)] hover:bg-white hover:text-[color:var(--brand-panel)] active:translate-y-px active:bg-[color:var(--button-outline-active)] disabled:border-[color:var(--border)] disabled:bg-[color:var(--button-disabled-surface)] disabled:text-[color:var(--button-disabled-text)] disabled:shadow-none",
  ghost:
    "border border-transparent bg-transparent text-[color:var(--button-ghost-text)] hover:bg-[color:var(--button-ghost-bg)] hover:text-[color:var(--brand-panel)] active:translate-y-px active:bg-[color:var(--button-ghost-active)] disabled:text-[color:var(--button-disabled-text)]",
  danger:
    "border border-[color:var(--danger-border)] bg-[linear-gradient(135deg,var(--danger),var(--danger-strong))] text-white shadow-[0_16px_36px_rgba(150,37,37,0.22)] hover:border-[color:var(--danger-border)] hover:bg-[linear-gradient(135deg,var(--danger-strong),#7f1d1d)] active:translate-y-px active:shadow-[0_10px_20px_rgba(150,37,37,0.18)] disabled:border-transparent disabled:bg-[color:var(--button-disabled-bg)] disabled:text-[color:var(--button-disabled-text)] disabled:shadow-none",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "size-11",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex min-w-fit shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold leading-none tracking-[0.01em] transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--focus-ring)] disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
}

function ButtonSpinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      loading = false,
      loadingText,
      variant = "primary",
      size = "md",
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={buttonStyles({ variant, size, className })}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <ButtonSpinner /> : null}
      {loading ? loadingText ?? children : children}
    </button>
  ),
);

Button.displayName = "Button";
