"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { logoutAction } from "@/app/actions/auth";
import { CartLink } from "@/components/ui/CartLink";

interface UserSession {
  email: string;
  name?: string;
}

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "VPS Plans", href: "/#pricing" },
  { label: "KVM", href: "/#features" },
  { label: "About", href: "/#about" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const supportLinks = [
  { label: "Knowledgebase", href: "/#faq" },
  { label: "Tutorials", href: "/#faq" },
  { label: "Submit Ticket", href: "mailto:support@webairy.com" },
];

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 17 20" fill="none" aria-hidden>
      <path
        d="M1.5 6.5h14v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1.5 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M5.5 6.5V4.5a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WebAiryHeader({ user }: { user: UserSession | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset overlays on client navigation
    setMenuOpen(false);
    setSupportOpen(false);
    setCurrencyOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeMenus = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setSupportOpen(false);
        setCurrencyOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenus);
    return () => document.removeEventListener("mousedown", closeMenus);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  const loginHref =
    pathname === "/checkout"
      ? `/login?redirect=${encodeURIComponent("/checkout")}`
      : pathname !== "/login"
        ? `/login?redirect=${encodeURIComponent(pathname)}`
        : "/login";

  return (
    <>
      <header
        ref={headerRef}
        id="header"
        className={`fixed inset-x-0 top-0 z-50 ${scrolled ? "nav-glass nav-glass-scrolled" : "nav-glass"}`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            aria-label="WebAiry home"
          >
            <Image
              src="/images/webairy-logo.png"
              alt="WebAiry"
              width={130}
              height={42}
              className="h-7 w-auto sm:h-8"
              priority
            />
          </Link>

          <nav aria-label="Main" className="hidden flex-1 justify-center xl:flex">
            <ul className="flex items-center gap-1">
              {mainLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    data-active={isActive(link.href) ? "true" : "false"}
                    className="nav-link-animated rounded-lg px-3 py-2 text-[13px] font-medium text-ink-muted-80 transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <a
              href="https://whatsapp.com/channel/0029VayEJL92f3EGG4iHQG2R"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg px-2.5 py-2 text-[12px] font-semibold text-[#25D366] transition-all duration-300 hover:bg-[#25D366]/10 md:inline-flex"
            >
              WhatsApp
            </a>

            <CartLink className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted-80 transition-all duration-300 hover:bg-primary/10 hover:text-primary active:scale-95">
              <BagIcon />
            </CartLink>

            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => {
                  setSupportOpen((o) => !o);
                  setCurrencyOpen(false);
                }}
                className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-[13px] text-ink-muted-80 transition-all duration-300 hover:bg-white/60 hover:text-primary"
                aria-expanded={supportOpen}
              >
                Support
                <span className={`text-[9px] transition-transform duration-300 ${supportOpen ? "rotate-180" : ""}`}>▼</span>
              </button>
              {supportOpen && (
                <ul className="nav-dropdown-glass absolute right-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-xl py-1.5 nav-mobile-panel">
                  {supportLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="block px-4 py-2 text-[13px] text-ink-muted-80 transition-colors hover:bg-primary/5 hover:text-primary"
                        onClick={() => setSupportOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => {
                  setCurrencyOpen((o) => !o);
                  setSupportOpen(false);
                }}
                className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-[13px] font-semibold text-ink transition-all duration-300 hover:bg-white/60 hover:text-primary"
                aria-expanded={currencyOpen}
              >
                USD
                <span className={`text-[9px] transition-transform duration-300 ${currencyOpen ? "rotate-180" : ""}`}>▼</span>
              </button>
              {currencyOpen && (
                <ul className="nav-dropdown-glass absolute right-0 top-full z-50 mt-2 min-w-[96px] overflow-hidden rounded-xl py-1.5 nav-mobile-panel">
                  <li>
                    <span className="block px-4 py-2 text-[13px] font-semibold text-primary">USD</span>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left text-[13px] text-ink-muted-80 transition-colors hover:bg-primary/5"
                    >
                      GBP
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {user ? (
              <>
                <Link
                  href="/orders"
                  className="hidden rounded-lg px-2.5 py-2 text-[13px] text-ink-muted-80 transition-all duration-300 hover:text-primary sm:inline-flex"
                >
                  Orders
                </Link>
                <button
                  type="button"
                  onClick={() => logoutAction()}
                  className="hidden rounded-lg px-2.5 py-2 text-[13px] text-ink-muted-80 transition-all duration-300 hover:text-primary sm:inline-flex cursor-pointer bg-transparent border-none"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href={loginHref}
                className="hidden rounded-lg px-2.5 py-2 text-[13px] text-ink-muted-80 transition-all duration-300 hover:text-primary sm:inline-flex"
              >
                Log In
              </Link>
            )}

            <Link
              href="/#pricing"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-on-primary shadow-[0_4px_20px_rgba(105,65,165,0.35)] transition-all duration-300 hover:bg-primary-focus hover:shadow-[0_6px_28px_rgba(105,65,165,0.45)] hover:-translate-y-0.5 active:scale-95"
            >
              Order Now
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors hover:bg-white/50 xl:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className={`block h-[2px] w-[18px] bg-ink transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-[18px] bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-[18px] bg-ink transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {pathname === "/checkout" && (
          <div className="border-t border-primary/10 bg-primary/[0.04] px-4 py-1.5 text-center text-[11px] font-medium tracking-wide text-primary sm:text-[12px]">
            Secure Checkout — your VPS will be provisioned within 24–48 hours
          </div>
        )}
      </header>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-[#1e1e24]/30 backdrop-blur-sm xl:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <div className="nav-mobile-panel nav-dropdown-glass fixed inset-x-4 top-[76px] z-50 max-h-[calc(100vh-96px)] overflow-y-auto rounded-2xl p-4 xl:hidden">
            <ul className="flex flex-col gap-0.5">
              {mainLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-ink hover:bg-white/70"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="my-3 h-px bg-hairline/80" />

            <ul className="flex flex-col gap-0.5">
              <li>
                <a
                  href="https://whatsapp.com/channel/0029VayEJL92f3EGG4iHQG2R"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl px-4 py-3 text-[15px] font-medium text-[#25D366]"
                >
                  Join WhatsApp Channel
                </a>
              </li>
              <li>
                <CartLink
                  className="block rounded-xl px-4 py-3 text-[15px] font-medium text-ink"
                  onNavigate={() => setMenuOpen(false)}
                >
                  View Cart
                </CartLink>
              </li>
              {user ? (
                <>
                  <li>
                    <Link href="/orders" className="block rounded-xl px-4 py-3 text-[15px] text-ink" onClick={() => setMenuOpen(false)}>
                      Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => logoutAction()}
                      className="block w-full rounded-xl px-4 py-3 text-left text-[15px] text-ink bg-transparent border-none cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href={loginHref} className="block rounded-xl px-4 py-3 text-[15px] text-ink" onClick={() => setMenuOpen(false)}>
                    Log In
                  </Link>
                </li>
              )}
            </ul>

            <Link
              href="/#pricing"
              className="mt-4 flex w-full items-center justify-center rounded-full bg-primary py-3 text-[15px] font-medium text-on-primary shadow-[0_4px_20px_rgba(105,65,165,0.35)]"
              onClick={() => setMenuOpen(false)}
            >
              Order Now
            </Link>
          </div>
        </>
      )}

      <div
        className={`shrink-0 ${pathname === "/checkout" ? "h-[98px]" : "h-[68px]"}`}
        aria-hidden
      />
    </>
  );
}
