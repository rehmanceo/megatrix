import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors duration-150 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-ember-600 text-white hover:bg-ember-700 shadow-[0_1px_0_rgba(0,0,0,0.05)]",
  secondary: "bg-ink-900 text-white hover:bg-ink-800",
  ghost: "bg-transparent text-ink-900 border border-ink-200 hover:border-ink-400 hover:bg-ink-50",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface ButtonProps {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = clsx(base, variants[variant], sizes[size], className);

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
