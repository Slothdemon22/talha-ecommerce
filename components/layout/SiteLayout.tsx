"use client";

import { usePathname } from "next/navigation";
import { GlobalFooter } from "./GlobalFooter";
import { GlobalNav } from "./GlobalNav";
import { SubNav } from "./SubNav";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

interface UserSession {
  email: string;
  name?: string;
}

export function SiteLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserSession | null;
}) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login";
  const isCheckoutPage = pathname === "/checkout";
  const isMinimalLayout = isAuthPage || isCheckoutPage;

  return (
    <>
      <WhatsAppButton />
      {/* Conditionally Render Headers */}
      {!isMinimalLayout ? (
        <>
          <GlobalNav user={user} />
          <div className="flex min-h-screen flex-col pt-11">
            <SubNav />
            <main className="flex-1">{children}</main>
          </div>
          <GlobalFooter />
        </>
      ) : (
        <div className="flex min-h-screen flex-col bg-canvas text-ink">
          {/* Minimal Premium Header for Auth & Checkout */}
          <header className="border-b border-divider-soft bg-canvas/80 backdrop-blur-md sticky top-0 z-50">
            <div className="mx-auto flex h-12 max-w-[1100px] items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="flex items-center gap-2 text-ink hover:opacity-80 active:scale-[0.96] transition-transform duration-200"
                style={{ transitionProperty: "transform, opacity" }}
                aria-label="Aura home"
              >
                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden>
                  <path d="M12.8 10.4c-.1-2.8 2.3-4.1 2.4-4.2-1.3-1.9-3.3-2.2-4-2.2-1.7-.2-3.3 1-4.2 1-.9 0-2.2-.9-3.6-.9-1.9 0-3.6 1.1-4.6 2.8-2 3.4-.5 8.4 1.4 11.1.9 1.4 2 2.9 3.4 2.8 1.4-.1 1.9-.9 3.6-.9 1.7 0 2.1.9 3.6.9 1.5 0 2.4-1.3 3.3-2.7.1-.2.2-.4.3-.6-2.8-1.1-3.2-5.2-3.2-5.2zM10.5 3.2c.8-1 1.3-2.3 1.1-3.7-1.1.1-2.4.7-3.1 1.6-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.4-.6 3.1-1.2z" />
                </svg>
                <span className="font-display text-[15px] font-semibold tracking-[-0.2px]">
                  Aura
                </span>
              </Link>

              {isCheckoutPage && (
                <div className="flex items-center gap-1.5 text-[12px] font-medium tracking-tight text-ink-muted-80">
                  <svg
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-focus"
                  >
                    <rect x="2" y="7" width="10" height="8" rx="2" ry="2" />
                    <path d="M4.5 7V4.5a2.5 2.5 0 0 1 5 0V7" />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
              )}
            </div>
          </header>

          <main className="flex-1 flex flex-col">{children}</main>

          {/* Minimal Premium Footer */}
          <footer className="border-t border-divider-soft bg-canvas-parchment py-8">
            <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-[12px] text-ink-muted-48">
                Copyright © {new Date().getFullYear()} Aura Inc. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4 text-[12px] text-ink-muted-48">
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms of Sale</Link>
                <Link href="#" className="hover:text-primary transition-colors">Support</Link>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
