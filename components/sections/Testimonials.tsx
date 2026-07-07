"use client";

type Testimonial = {
  title: string;
  body: string;
  author: string;
  stars: number;
};

const testimonials: Testimonial[] = [
  {
    title: "Excellent Service",
    body: `"Excellent Service and Support! I've had a great experience with Aura VPS so far. The server setup was fast, VPS performance is incredibly reliable, and customer support has been responsive and helpful. Highly recommended!"`,
    author: "Taran Parhar",
    stars: 5,
  },
  {
    title: "Great Experience",
    body: `"I've been using Aura for VPS hosting and have consistently been impressed with their performance and network stability. Today, their support team went above and beyond to resolve my config issue immediately."`,
    author: "Mirza Shakeel",
    stars: 5,
  },
  {
    title: "Outstanding Service",
    body: `"I have been hosting my applications on these VPS nodes for the past 3 years, and I must say, their service is outstanding. The servers are fast, reliable, and stable, with minimal to zero downtime. Support is top-tier."`,
    author: "Waqas Lateef",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-canvas-parchment px-6 py-20 sm:py-24 lg:px-8 lg:py-[80px] border-t border-hairline"
    >
      <div className="mx-auto max-w-[980px]">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.1em] text-ink-muted-48">
            Customer Insights
          </p>
          <h2 className="font-display text-display-md text-ink">
            Our Client Reviews
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lead-airy text-ink-muted-80">
            See what developers and sysadmins have to say about Aura VPS hosting performance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <article
              key={idx}
              className="flex flex-col justify-between bg-canvas border border-hairline rounded-lg p-6 sm:p-8 transition-premium hover:border-ink-muted-48/30 hover:scale-[1.01]"
            >
              <div className="space-y-4">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-[16px] font-bold">★</span>
                  ))}
                </div>
                <h3 className="font-display text-[17px] font-semibold text-ink leading-tight">
                  {t.title}
                </h3>
                <p className="text-[15px] leading-[1.5] text-ink-muted-80 font-normal">
                  {t.body}
                </p>
              </div>
              <footer className="mt-6 border-t border-divider-soft pt-4 text-[14px] font-semibold text-ink">
                — {t.author}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
