const kvmFeatures = [
  { title: "99% Uptime Guarantee" },
  { title: "Advance Security" },
  { title: "Premium Support" },
  { title: "SSD Enabled VPS" },
];

export function FeatureGrid() {
  return (
    <>
      <section
        id="features"
        className="bg-canvas px-6 py-20 sm:py-24 lg:px-8 lg:py-[80px] border-t border-hairline"
      >
        <div className="mx-auto max-w-[980px] text-center">
          <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.1em] text-ink-muted-48">
            Virtual Private Server — VPS
          </p>
          <h2 className="font-display text-display-md text-ink">
            Experience The Power of KVM!
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lead-airy text-ink-muted-80">
            WebAiry unlocks the full potential of VPS hosting with the unmatched
            power of KVM virtualization. Take control, scale effortlessly, and
            elevate your online presence with ease.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {kvmFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-hairline bg-canvas-parchment px-4 py-8 text-center transition-premium hover:border-primary/20"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-semibold text-ink">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="bg-canvas-parchment text-ink px-6 py-20 sm:px-10 sm:py-24 lg:px-8 lg:py-[80px] border-t border-hairline"
      >
        <div className="mx-auto flex max-w-[980px] flex-col items-center text-center space-y-6">
          <p className="text-[14px] font-semibold uppercase tracking-[0.12em] text-primary">
            Who We Are
          </p>
          <h2 className="font-display text-display-md text-ink">Together We Grow</h2>
          <p className="text-lead-airy text-ink-muted-80 max-w-3xl leading-[1.6]">
            WebAiry is a well respected hosting company recognized for its
            dedication to providing dependable and secure hosting services. Our
            top priority is ensuring customer contentment, achieved through
            exceptional customer support, strong security protocols, and the
            ability to adjust resources according to users&apos; requirements. As a
            result, it is a favoured option for individuals and businesses
            seeking trustworthy hosting solutions.
          </p>
        </div>
      </section>
    </>
  );
}
