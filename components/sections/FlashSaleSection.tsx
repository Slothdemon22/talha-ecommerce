import { PlanCheckoutLink } from "@/components/ui/PlanCheckoutLink";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { vpsPlans } from "@/lib/plans";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-primary" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
      <path d="M6 10.2l2.4 2.4L14 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function parseSpecs(specs: string) {
  return specs
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^-\s*/, ""));
}

export function FlashSaleSection() {
  return (
    <section id="pricing" className="bg-canvas-parchment px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <RevealOnScroll className="text-center">
          <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Save up to 44% on Monthly Packages
          </span>
          <h2 className="font-display text-display-md sm:text-[40px] font-semibold text-ink text-balance">
            Unleashing the Power of Mega Sale
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed text-ink-muted-80 text-pretty">
            WebAiry Offers unbeatable prices for US &amp; UK VPS. We have designed
            robust and dependable Windows-based servers tailored to customer
            requirements.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {vpsPlans.map((plan, index) => (
            <RevealOnScroll
              key={plan.id}
              delay={index * 90}
              as="article"
              className="pricing-card group flex h-full flex-col overflow-hidden rounded-2xl bg-canvas shadow-[0_4px_20px_rgba(61,26,102,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(61,26,102,0.2)]"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-focus px-6 py-7 text-center text-on-primary">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-white/[0.06]"
                />

                <h3 className="relative text-[14px] font-semibold uppercase tracking-[0.04em] text-white/90">
                  {plan.name}
                </h3>

                <div className="relative mt-4 flex items-baseline justify-center gap-2">
                  <span className="text-[13px] text-white/60 line-through tabular-nums">
                    ${plan.originalPrice.toFixed(2)}
                  </span>
                  <span className="rounded-full bg-[#FFC94D] px-2.5 py-0.5 text-[11px] font-semibold uppercase text-[#5a3d00]">
                    Save {plan.savePercent}%
                  </span>
                </div>

                <p className="relative mt-2 font-display text-[40px] font-bold leading-none tabular-nums">
                  ${plan.price.toFixed(2)}
                </p>
                <p className="relative mt-1 text-[13px] font-medium text-white/70">
                  USD / Monthly
                </p>

                <PlanCheckoutLink
                  planId={plan.id}
                  className="relative mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2.5 text-[14px] font-semibold text-primary transition-[transform,box-shadow] duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:scale-[0.96]"
                >
                  Order Now
                </PlanCheckoutLink>
              </div>

              <div className="flex-1 p-6">
                <ul className="space-y-2.5">
                  {parseSpecs(plan.specs).map((line) => (
                    <li key={line} className="flex items-start gap-2 text-[13px] leading-[1.5] text-ink-muted-80">
                      <CheckIcon />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
