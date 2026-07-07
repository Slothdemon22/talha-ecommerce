"use client";

import Link from "next/link";

const footerColumns = [
  {
    title: "VPS Plans",
    links: [
      { label: "Windows 4GB VPS", href: "/#pricing" },
      { label: "Windows 8GB VPS", href: "/#pricing" },
      { label: "Windows 16GB VPS", href: "/#pricing" },
      { label: "KVM Hypervisor", href: "/#features" },
      { label: "Client Reviews", href: "/#testimonials" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Aura VPS", href: "/#about" },
      { label: "Infrastructure Nodes", href: "/#features" },
      { label: "Security Protocols", href: "/#features" },
      { label: "Datacenter Status", href: "#" },
      { label: "Global Network", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Remote Desktop Guide", href: "/#faq" },
      { label: "OS Templates Guide", href: "/#features" },
      { label: "SLA Guarantee", href: "/#features" },
      { label: "TOS Policy", href: "#" },
      { label: "Refund Policy", href: "/#faq" },
    ],
  },
  {
    title: "Support Hub",
    links: [
      { label: "WhatsApp Support", href: "https://wa.me/923398010015" },
      { label: "Submit Ticket", href: "#" },
      { label: "Datacenter Location Choice", href: "/#faq" },
      { label: "Sysadmin Guides", href: "/#faq" },
      { label: "Contact Sales", href: "https://wa.me/923398010015" },
    ],
  },
];

const legalLinks = [
  "Privacy Policy",
  "Terms of Use",
  "Sales Policy",
  "Legal",
  "Site Map",
];

export function GlobalFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="support" className="bg-canvas-parchment px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-[980px]">
        <p className="mb-10 max-w-3xl text-fine-print leading-relaxed text-ink-muted-48 text-pretty">
          Windows Server is a registered trademark of Microsoft Corporation. All Virtual Private Servers are isolated virtual machine environments hosted on enterprise hardware nodes.
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-3 text-[14px] font-semibold leading-[1.29] tracking-[-0.224px] text-ink">
                {column.title}
              </h3>
              <ul className="space-y-0">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-dense-link text-ink-muted-80 transition-colors duration-200 hover:text-primary"
                      style={{ transitionProperty: "color" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-hairline pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-fine-print text-ink-muted-48">
                Copyright © {new Date().getFullYear()} Aura VPS Inc. All rights reserved.
              </p>
              <button
                type="button"
                onClick={scrollToTop}
                className="text-micro-legal text-primary hover:text-primary-focus active:scale-[0.96] transition-transform duration-200 cursor-pointer"
                style={{ transitionProperty: "transform, color" }}
              >
                Back to top ↑
              </button>
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {legalLinks.map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="text-micro-legal text-ink-muted-48 transition-colors duration-200 hover:text-primary"
                    style={{ transitionProperty: "color" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-micro-legal leading-relaxed text-ink-muted-48 text-pretty">
            Aura VPS is a high-performance VPS service portal. Remote Desktop and Windows Server configurations are provisioned for educational and promotional purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
