"use client";

import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/#about" },
      { label: "Services", href: "/#pricing" },
      { label: "Locations", href: "/#faq" },
      { label: "MSP", href: "/#features" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Knowledgebase", href: "/#faq" },
      { label: "Submit Ticket", href: "mailto:support@webairy.com" },
      { label: "Tutorials", href: "/#faq" },
      { label: "Server Status", href: "/#features" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Services", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Refund Policy", href: "/#faq" },
      { label: "FAQs", href: "/#faq" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.57 14.2 3.57c-2.4 0-4 1.46-4 4.15v2.17H7.5v3.1h2.7V21h3.3z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M20.5 6.9c-.6.27-1.24.45-1.9.53a3.3 3.3 0 001.45-1.83 6.6 6.6 0 01-2.1.8 3.3 3.3 0 00-5.63 3 9.36 9.36 0 01-6.8-3.45 3.3 3.3 0 001.02 4.4 3.28 3.28 0 01-1.5-.4v.04a3.3 3.3 0 002.65 3.24 3.3 3.3 0 01-1.5.06 3.3 3.3 0 003.08 2.3A6.63 6.63 0 013 17.05a9.34 9.34 0 005.06 1.48c6.07 0 9.4-5.03 9.4-9.39l-.01-.43a6.7 6.7 0 001.65-1.72c-.6.27-1.24.45-1.9.53l.3-.02z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.6a1.96 1.96 0 100 3.92 1.96 1.96 0 000-3.92zM20.5 20h-3.37v-6.02c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V20H9.46V8.5h3.24v1.57h.05c.45-.85 1.55-1.75 3.2-1.75 3.43 0 4.06 2.26 4.06 5.2V20z" />
      </svg>
    ),
  },
];

export function GlobalFooter() {
  return (
    <footer
      id="support"
      className="border-t border-white/[0.06] bg-gradient-to-b from-[#1c1130] to-[#100a1c] text-on-dark"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center" aria-label="WebAiry home">
              <Image
                src="/images/webairy-logo.png"
                alt="WebAiry"
                width={110}
                height={36}
                className="h-6 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="mt-3 max-w-[220px] text-[12px] leading-relaxed text-body-muted">
              High-performance US &amp; UK Windows VPS hosting with 24/7 support.
            </p>

            <div className="mt-4 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-white/70 transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-primary-on-dark/20 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/90">
                {column.title}
              </h3>
              <ul className="space-y-1.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-body-muted transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/90">
              WEBAIRY LTD
            </h3>
            <address className="not-italic space-y-1 text-[12px] leading-relaxed text-body-muted">
              <p>Catimor House, 47 Cranton Avenue</p>
              <p>Hayes, England, UB3 4FW</p>
              <p className="pt-1">Co. #12681569 · VAT #469475829</p>
            </address>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-body-muted">
            Copyright © {new Date().getFullYear()} WebAiry. All Rights Reserved.
          </p>
          <p className="text-[11px] text-body-muted/80">
            Cookies help us improve your experience on this site.
          </p>
        </div>
      </div>
    </footer>
  );
}
