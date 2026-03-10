import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-white/10 bg-[linear-gradient(135deg,#151d30,#090d16)] text-[color:var(--button-primary-text)] shadow-[0_18px_44px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/16 hover:brightness-110 active:translate-y-px active:brightness-95 active:shadow-[0_10px_22px_rgba(0,0,0,0.34)] disabled:border-white/6 disabled:bg-[color:var(--button-disabled-bg)] disabled:text-[color:var(--button-disabled-text)] disabled:shadow-none",
  secondary:
    "border border-[color:var(--accent-border-strong)] bg-[linear-gradient(135deg,rgba(239,210,152,0.98),rgba(185,150,88,0.98))] text-[color:var(--button-secondary-text)] shadow-[0_18px_44px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.34)] hover:border-[color:var(--accent-strong)] hover:brightness-[1.05] active:translate-y-px active:brightness-95 active:shadow-[0_10px_20px_rgba(0,0,0,0.28)] disabled:border-white/6 disabled:bg-[color:var(--button-disabled-bg)] disabled:text-[color:var(--button-disabled-text)] disabled:shadow-none",
  outline:
    "border border-[color:var(--border-strong)] bg-[color:var(--button-outline-bg)] text-[color:var(--button-outline-text)] shadow-[0_14px_34px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/20 hover:bg-white/8 hover:text-[color:var(--text-strong)] active:translate-y-px active:bg-[color:var(--button-outline-active)] disabled:border-white/6 disabled:bg-[color:var(--button-disabled-surface)] disabled:text-[color:var(--button-disabled-text)] disabled:shadow-none",
  ghost:
    "border border-transparent bg-transparent text-[color:var(--button-ghost-text)] hover:bg-[color:var(--button-ghost-bg)] hover:text-[color:var(--text-strong)] active:translate-y-px active:bg-[color:var(--button-ghost-active)] disabled:text-[color:var(--button-disabled-text)]",
  danger:
    "border border-[color:var(--danger-border)] bg-[linear-gradient(135deg,var(--danger),var(--danger-strong))] text-white shadow-[0_16px_36px_rgba(0,0,0,0.3)] hover:border-[color:var(--danger-border)] hover:brightness-110 active:translate-y-px active:brightness-95 active:shadow-[0_10px_20px_rgba(0,0,0,0.26)] disabled:border-white/6 disabled:bg-[color:var(--button-disabled-bg)] disabled:text-[color:var(--button-disabled-text)] disabled:shadow-none",
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
    "inline-flex min-w-fit shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold leading-none tracking-[0.01em] transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--focus-ring)] disabled:pointer-events-none disabled:cursor-not-allowed",
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
