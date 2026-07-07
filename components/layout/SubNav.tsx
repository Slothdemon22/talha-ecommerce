"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type SubNavLink = {
  label: string;
  href: string;
};

const subNavLinks: SubNavLink[] = [
  { label: "Overview", href: "/#hero" },
  { label: "VPS Plans", href: "/#pricing" },
  { label: "Features", href: "/#features" },
  { label: "FAQs", href: "/#faq" },
];

export function SubNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 44);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky top-11 z-40 w-full transition-premium ${
        scrolled
          ? "border-b border-hairline/80 bg-canvas/90 shadow-sm backdrop-blur-md"
          : "border-b border-divider-soft bg-canvas-parchment/80 backdrop-blur-md"
      }`}
      style={{
        transitionProperty: "background-color, border-color, box-shadow",
        transitionDuration: "0.2s",
        transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      <div className="mx-auto flex h-[52px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link
            href="/#hero"
            className="font-display text-[20px] font-semibold tracking-[-0.015em] text-ink transition-colors hover:text-primary"
            style={{
              transitionProperty: "color",
              transitionDuration: "0.25s",
            }}
          >
            Aura VPS
          </Link>
        </div>

        <div className="flex items-center gap-6 sm:gap-8">
          <ul className="hidden items-center gap-6 md:flex">
            {subNavLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[12px] font-normal tracking-[-0.01em] text-ink-muted-80 transition-colors hover:text-primary"
                  style={{
                    transitionProperty: "color",
                    transitionDuration: "0.25s",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center">
            <Button
              variant="primary"
              href="#pricing"
              className="!px-4 !py-1.5 !text-[12px] font-semibold active:scale-[0.96] transition-transform"
            >
              Buy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
