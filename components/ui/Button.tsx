import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "store-hero" | "dark-utility";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-full bg-primary px-[22px] py-[11px] text-[17px] font-normal leading-[1.47] tracking-[-0.374px] text-on-primary transition-premium hover:bg-primary-focus focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus btn-press",
  secondary:
    "inline-flex items-center justify-center rounded-full border border-primary bg-transparent px-[22px] py-[11px] text-[17px] font-normal leading-[1.47] tracking-[-0.374px] text-primary transition-premium hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus btn-press",
  "store-hero":
    "inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-[18px] font-light leading-none text-on-primary transition-premium hover:bg-primary-focus focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus btn-press",
  "dark-utility":
    "inline-flex items-center justify-center rounded-sm bg-ink px-[15px] py-2 text-[14px] font-normal leading-[1.29] tracking-[-0.224px] text-on-dark transition-premium hover:bg-ink-muted-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus btn-press",
};

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
