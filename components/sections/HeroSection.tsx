import Image from "next/image";
import { PlanCheckoutLink } from "@/components/ui/PlanCheckoutLink";
import { vpsPlans } from "@/lib/plans";

const starterPlan = vpsPlans[0];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-canvas px-6 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-primary/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-primary/[0.04] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl space-y-8 lg:py-6">
          <h1 className="hero-animate hero-animate-1 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink text-balance">
            Launch High Performance VPS Services
          </h1>

          <p className="hero-animate hero-animate-2 text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-ink-muted-80">
            Get your service in a few minutes
          </p>

          <div className="hero-animate hero-animate-3 flex flex-wrap items-center gap-5 sm:gap-8">
            <PlanCheckoutLink
              planId={starterPlan.id}
              className="hero-cta-btn inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-[15px] font-semibold text-on-primary transition-[transform,background-color,box-shadow] duration-300 hover:bg-primary-focus hover:shadow-[0_12px_40px_rgba(105,65,165,0.5)] active:scale-[0.96]"
            >
              Order Now
            </PlanCheckoutLink>

            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.02em] text-ink tabular-nums">
                ${starterPlan.price.toFixed(2)}
              </span>
              <span className="text-[15px] text-ink-muted-80">USD /mo</span>
            </div>
          </div>
        </div>

        <div className="hero-animate hero-animate-4 relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <div className="hero-image-float relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-primary/5 blur-2xl"
            />
            <Image
              src="/images/web-air.webp"
              alt="WebAiry VPS hosting infrastructure"
              width={640}
              height={480}
              priority
              className="relative z-10 h-auto w-full object-contain drop-shadow-[0_24px_48px_rgba(61,26,102,0.15)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
