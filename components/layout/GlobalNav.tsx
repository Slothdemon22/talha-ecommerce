"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { logoutAction } from "@/app/actions/auth";

interface UserSession {
  email: string;
  name?: string;
}

function BagIcon() {
  return (
    <svg
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
      aria-hidden
      className="opacity-90"
    >
      <path
        d="M1.5 6.5h14v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1.5 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M5.5 6.5V4.5a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden
      className="opacity-90"
    >
      <circle cx="6.5" cy="6.5" r="4.75" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function GlobalNav({ user }: { user: UserSession | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logoutAction();
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "VPS Plans", href: "/#pricing" },
    { label: "KVM Features", href: "/#features" },
    { label: "Reviews", href: "/#testimonials" },
    { label: "FAQs", href: "/#faq" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-premium ${
        scrolled ? "nav-frosted-scrolled" : "nav-frosted"
      }`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex h-11 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-nav-link font-normal tracking-wide text-on-dark hover:opacity-80 active:scale-[0.96] transition-transform duration-200"
          style={{ transitionProperty: "transform, opacity" }}
          aria-label="Aura home"
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden>
            <path d="M12.8 10.4c-.1-2.8 2.3-4.1 2.4-4.2-1.3-1.9-3.3-2.2-4-2.2-1.7-.2-3.3 1-4.2 1-.9 0-2.2-.9-3.6-.9-1.9 0-3.6 1.1-4.6 2.8-2 3.4-.5 8.4 1.4 11.1.9 1.4 2 2.9 3.4 2.8 1.4-.1 1.9-.9 3.6-.9 1.7 0 2.1.9 3.6.9 1.5 0 2.4-1.3 3.3-2.7.1-.2.2-.4.3-.6-2.8-1.1-3.2-5.2-3.2-5.2zM10.5 3.2c.8-1 1.3-2.3 1.1-3.7-1.1.1-2.4.7-3.1 1.6-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.4-.6 3.1-1.2z" />
          </svg>
          <span className="hidden font-display text-[14px] font-semibold tracking-[-0.2px] sm:inline">
            Aura
          </span>
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-5 md:flex lg:gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-nav-link tracking-wide text-on-dark/90 hover:text-on-dark transition-colors duration-250"
                style={{ transitionProperty: "color" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {user ? (
            <>
              <li>
                <Link
                  href="/orders"
                  className="text-nav-link tracking-wide text-on-dark/90 hover:text-on-dark transition-colors duration-250"
                  style={{ transitionProperty: "color" }}
                >
                  Orders
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-nav-link tracking-wide text-on-dark/90 hover:text-on-dark cursor-pointer transition-colors duration-250 bg-transparent border-none p-0 outline-none"
                  style={{ transitionProperty: "color" }}
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="text-nav-link tracking-wide text-on-dark/90 hover:text-on-dark transition-colors duration-250"
                style={{ transitionProperty: "color" }}
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4 sm:gap-5">
          <button
            type="button"
            className="hidden text-on-dark/90 hover:text-on-dark active:scale-[0.96] transition-transform duration-200 sm:block"
            style={{ transitionProperty: "transform, color" }}
            aria-label="Search"
          >
            <SearchIcon />
          </button>
          <Link
            href="/#pricing"
            className="flex h-11 w-11 items-center justify-center text-on-dark/90 hover:text-on-dark active:scale-[0.96] transition-transform duration-200"
            style={{ transitionProperty: "transform, color" }}
            aria-label="Shopping bag"
          >
            <BagIcon />
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] active:scale-[0.96] transition-transform duration-200 md:hidden"
            style={{ transitionProperty: "transform" }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block h-[1px] w-[17px] bg-on-dark transition-all duration-300 ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1px] w-[17px] bg-on-dark transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1px] w-[17px] bg-on-dark transition-all duration-300 ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-6 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[17px] text-on-dark transition-premium hover:text-primary-on-dark"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <Link
                    href="/orders"
                    className="text-[17px] text-on-dark transition-premium hover:text-primary-on-dark"
                    onClick={() => setMenuOpen(false)}
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <button
                    onClick={async () => {
                      setMenuOpen(false);
                      await handleLogout();
                    }}
                    className="text-[17px] text-on-dark text-left w-full transition-premium hover:text-primary-on-dark bg-transparent border-none p-0 outline-none cursor-pointer"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="text-[17px] text-on-dark transition-premium hover:text-primary-on-dark"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
