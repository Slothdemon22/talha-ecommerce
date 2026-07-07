import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type TextLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  onDark?: boolean;
  showChevron?: boolean;
  children: React.ReactNode;
};

export function TextLink({
  href,
  onDark = false,
  showChevron = true,
  className = "",
  children,
  ...props
}: TextLinkProps) {
  const colorClass = onDark
    ? "text-primary-on-dark hover:text-on-dark"
    : "text-primary hover:text-primary-focus";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 text-[17px] font-normal leading-[1.47] tracking-[-0.374px] transition-premium ${colorClass} ${className}`}
      {...props}
    >
      {children}
      {showChevron && (
        <span aria-hidden className="text-[14px] transition-transform duration-300 group-hover:translate-x-0.5">
          ›
        </span>
      )}
    </Link>
  );
}
