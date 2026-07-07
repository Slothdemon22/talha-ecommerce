import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

function ContactIllustration() {
  return (
    <div className="relative mx-auto flex h-[280px] w-full max-w-[380px] items-center justify-center sm:h-[320px]">
      <div
        aria-hidden="true"
        className="absolute h-[220px] w-[220px] rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-focus sm:h-[260px] sm:w-[260px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-4 -left-2 h-16 w-16 rounded-full bg-primary/10 blur-md"
      />
      <div
        aria-hidden="true"
        className="absolute -top-3 -right-1 h-12 w-12 rounded-full bg-primary/10 blur-md"
      />

      <div className="contact-illustration-float relative w-[76%] rounded-2xl bg-canvas p-4 shadow-[0_20px_48px_rgba(61,26,102,0.28)] sm:p-5">
        <div className="flex items-center gap-2.5 border-b border-divider-soft pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M4 14a8 8 0 0116 0v3H4v-3z" />
              <path d="M8 17v2M16 17v2" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-ink">Support Team</p>
            <p className="flex items-center gap-1 text-[11px] text-ink-muted-80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online now
            </p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="h-2.5 w-[85%] rounded-full bg-canvas-parchment" />
          <div className="h-2.5 w-[65%] rounded-full bg-canvas-parchment" />
          <div className="h-2.5 w-[75%] rounded-full bg-primary/15" />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="contact-badge-float absolute -right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-canvas text-primary shadow-[0_10px_28px_rgba(61,26,102,0.22)] sm:-right-5 sm:top-6"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 5h16v11H7l-3 3V5z" />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="contact-badge-float-delayed absolute -left-2 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.35)] sm:-left-4"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.35A10 10 0 1012 2zm5.6 14.3c-.24.66-1.4 1.26-1.93 1.34-.5.08-1.12.11-1.8-.12a13 13 0 01-4.05-2.5 12.6 12.6 0 01-2.5-4.05c-.23-.68-.2-1.3-.12-1.8.08-.53.68-1.69 1.34-1.93.24-.1.5-.13.7-.03l1.3.63c.2.1.35.3.4.52l.4 1.6c.05.2 0 .4-.13.55l-.6.65c-.14.15-.16.37-.06.55.5.9 1.3 1.7 2.2 2.2.18.1.4.08.55-.06l.65-.6c.15-.13.35-.18.55-.13l1.6.4c.22.05.42.2.52.4l.63 1.3c.1.2.07.46-.03.7z" />
        </svg>
      </div>
    </div>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-hairline bg-canvas px-6 py-20 sm:py-24 lg:px-8 lg:py-[80px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(105,65,165,0.08),transparent_55%)]"
      />

      <div className="relative mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <RevealOnScroll className="text-center lg:text-left">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Contact Us
          </p>
          <h2 className="font-display text-display-md text-ink">Get in Touch</h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted-80 text-pretty lg:mx-0">
            Powerful VPS hosting tailored to your needs. Experience high-performance,
            flexible solutions with reliable support. Get started today!
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              href="https://wa.me/message/YSCAGVVZZN6YE1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3 text-[15px] font-medium text-white transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_28px_rgba(37,211,102,0.35)] active:scale-[0.96]"
            >
              WhatsApp
            </Link>
            <Link
              href="mailto:support@webairy.com"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-[15px] font-medium text-on-primary transition-[transform,background-color,box-shadow] duration-300 hover:bg-primary-focus hover:shadow-[0_8px_28px_rgba(105,65,165,0.35)] active:scale-[0.96]"
            >
              Email Us!
            </Link>
          </div>
          <p className="mt-6 text-[14px] text-ink-muted-80">Get in touch with us!</p>
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <ContactIllustration />
        </RevealOnScroll>
      </div>
    </section>
  );
}
