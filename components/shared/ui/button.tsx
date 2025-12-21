"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "ghost" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  href,
  className,
  disabled,
  ...rest
}: BaseProps) {
  const base = "inline-flex items-center justify-center rounded-full font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-brand-forest text-white hover:bg-brand-leaf focus-visible:ring-brand-forest",
    secondary: "bg-white text-brand-forest border border-brand-forest hover:bg-brand-forest/5 focus-visible:ring-brand-forest",
    outline: "bg-white text-brand-forest border border-slate-200 hover:bg-slate-50 focus-visible:ring-slate-300",
    ghost: "bg-transparent text-brand-forest hover:bg-slate-100 focus-visible:ring-transparent",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-12 px-8 text-base",
  };

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
  const fullWidthClass = fullWidth ? "w-full" : "inline-block";

  const classes = cn(base, variantClasses[variant], sizeClasses[size], fullWidthClass, disabledClass, className);

  const content = (
    <>
      {leadingIcon ? <span className="mr-2 flex items-center">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="ml-2 flex items-center">{trailingIcon}</span> : null}
    </>
  );

  if (href) {
    // Cast rest to anchor props so we can forward common attributes (aria, onClick, etc.)
    const linkProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} className={classes} aria-disabled={disabled} {...linkProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}

export default Button;
