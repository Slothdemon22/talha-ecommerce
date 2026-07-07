import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-canvas px-6 pb-12 pt-10 sm:pb-16 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-16"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-[13px] font-semibold tracking-wide text-primary">
            Save up to 44% on Monthly Packages
          </p>
          <h1 className="font-display text-hero-display font-semibold tracking-tight text-ink">
            Unleashing the Power of Mega Sale
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lead-airy text-ink-muted-80 lg:mx-0">
            WebAiry offers unbeatable prices for US &amp; UK VPS. We have designed
            robust and dependable Windows-based servers tailored to customer
            requirements.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button variant="store-hero" href="#pricing">
              Order Now
            </Button>
            <Button variant="secondary" href="#contact">
              Contact Us
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-[560px] flex-shrink-0 lg:max-w-none lg:flex-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/web-air.webp"
              alt="WebAiry VPS hosting — server infrastructure and cloud management"
              fill
              priority
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
