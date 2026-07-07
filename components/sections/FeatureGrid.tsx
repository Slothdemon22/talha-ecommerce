import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const kvmFeatures = [
  {
    title: "99% Uptime Guarantee",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Advance Security",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Premium Support",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M4 14a8 8 0 0116 0v3H4v-3z" />
        <path d="M8 17v2M16 17v2" />
        <path d="M12 4v2" />
      </svg>
    ),
  },
  {
    title: "SSD Enabled VPS",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    ),
  },
];

export function FeatureGrid() {
  return (
    <>
      <section
        id="features"
        className="border-t border-hairline bg-canvas px-6 py-20 sm:py-24 lg:px-8 lg:py-[80px]"
      >
        <div className="mx-auto max-w-[980px] text-center">
          <RevealOnScroll>
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
              Virtual Private Server - VPS
            </p>
            <h2 className="font-display text-display-md text-ink text-balance">
              Experience The Power of KVM!
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-[16px] leading-relaxed text-ink-muted-80 text-pretty">
              WebAiry unlocks the full potential of VPS hosting with the unmatched
              power of KVM virtualization. Take control, scale effortlessly, and
              elevate your online presence with ease.
            </p>
          </RevealOnScroll>

          <div className="mt-14 grid grid-cols-2 divide-y divide-hairline sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
            {kvmFeatures.map((feature, index) => (
              <RevealOnScroll key={feature.title} delay={index * 80} className="h-full">
                <div className="feature-item group flex h-full flex-col items-center gap-4 px-4 py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-[transform,background-color,color] duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-[14px] font-semibold text-ink sm:text-[15px]">
                    {feature.title}
                  </h3>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative overflow-hidden border-t border-hairline bg-canvas-parchment px-6 py-20 text-ink sm:px-10 sm:py-24 lg:px-8 lg:py-[80px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(105,65,165,0.08),transparent_50%)]"
        />
        <RevealOnScroll className="relative mx-auto flex max-w-[980px] flex-col items-center space-y-6 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-primary">
            Who We Are
          </p>
          <h2 className="font-display text-display-md text-ink">Together We Grow</h2>
          <p className="max-w-3xl text-[16px] leading-relaxed text-ink-muted-80 text-pretty">
            WebAiry is a well respected hosting company recognized for its
            dedication to providing dependable and secure hosting services. Our
            top priority is ensuring customer contentment, achieved through
            exceptional customer support, strong security protocols, and the
            ability to adjust resources according to users&apos; requirements. As a
            result, it is a favoured option for individuals and businesses
            seeking trustworthy hosting solutions.
          </p>
        </RevealOnScroll>
      </section>
    </>
  );
}
