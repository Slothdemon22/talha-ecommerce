import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ReviewsCarousel } from "@/components/ui/ReviewsCarousel";

type Platform = "trustpilot" | "facebook" | "google";

type Testimonial = {
  title: string;
  body: string;
  author: string;
  platform: Platform;
};

const testimonials: Testimonial[] = [
  {
    title: "Excellent Service",
    body: `"Excellent Service and Support! I've had a great experience with the service so far. The setup was quick, performance is reliable, and customer support has been responsive and helpful. Highly recommended for anyone looking for a hassle-free solution!"`,
    author: "Taran Parhar",
    platform: "google",
  },
  {
    title: "Great experience",
    body: `"I've been using Webairy for VPS hosting and have consistently been impressed with their performance and reliability. Today, their support team went above and beyond to resolve my issue promptly and professionally. The service is fast, stable and well-managed."`,
    author: "Mirza Shakeel",
    platform: "trustpilot",
  },
  {
    title: "Outstanding Service",
    body: `"I have been using Webairy's VPS services for the past 3–4 years, and I must say, their service has been outstanding. The servers are fast, reliable, and stable, with minimal downtime. The customer support team is always responsive and helpful whenever I have questions."`,
    author: "Ar Knifes",
    platform: "facebook",
  },
  {
    title: "Great Service",
    body: `"Sir, your service impressed me a lot. It's a great service. You provide service even on your days off. You provide service immediately. You respond immediately. You respond to everything. I really enjoyed working with WebAiry. You are a very good team. Well done."`,
    author: "Waqas Lateef",
    platform: "google",
  },
  {
    title: "Exceptional Support",
    body: `"I recently had the opportunity to use WebAiry VPS, and I am thoroughly impressed with their services. One of the standout features of WebAiry is their exceptional customer support. The team is incredibly responsive, knowledgeable. I would highly recommend them."`,
    author: "Muhammad Kamran",
    platform: "trustpilot",
  },
  {
    title: "Very Good Company",
    body: `"It is a very good company, they have a very good system and their support is very good. The performance of the system is also very good and they deal very well with the client. If we talk about reviews, I give the company a 100 out of 100. Highly Recommended"`,
    author: "Danish Awan",
    platform: "facebook",
  },
];

function PlatformLogo({ platform }: { platform: Platform }) {
  if (platform === "trustpilot") {
    return (
      <div className="flex items-center gap-1.5" aria-label="Trustpilot review">
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#00B67A"
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
          Trustpilot
        </span>
      </div>
    );
  }

  if (platform === "facebook") {
    return (
      <div className="text-[22px] font-bold leading-none text-[#1877F2]" aria-label="Facebook review">
        facebook
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5 text-[20px] font-medium leading-none" aria-label="Google review">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </div>
  );
}

function StarRating({ size = 18 }: { size?: number }) {
  return (
    <div className="flex gap-0.5 text-[#FFB400]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ fontSize: size }} className="leading-none">
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-t border-hairline bg-canvas-parchment py-20 sm:py-24 lg:py-[80px]"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <RevealOnScroll className="mb-14 text-center">
          <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.1em] text-ink-muted-48">
            Customer Insights
          </p>
          <h2 className="font-display text-display-md text-ink">Our Client Reviews</h2>
          <p className="mx-auto mt-4 max-w-lg text-lead-airy text-ink-muted-80">
            See what our clients have to say about WebAiry. We&apos;re proud of our
            ratings across multiple platforms.
          </p>
        </RevealOnScroll>

      </div>

      <ReviewsCarousel className="mt-10">
        <div className="flex w-max gap-4 sm:gap-5">
          {testimonials.map((t) => (
            <article
              key={t.author}
              className="flex w-[min(90vw,340px)] shrink-0 snap-start flex-col rounded-xl bg-canvas p-6 shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] sm:w-[340px] sm:p-8"
            >
              <PlatformLogo platform={t.platform} />

              <h3 className="mt-5 font-display text-[17px] font-semibold leading-tight text-ink">
                {t.title}
              </h3>

              <p className="mt-3 flex-1 text-[14px] leading-[1.55] text-ink-muted-80">
                {t.body}
              </p>

              <div className="mt-6 space-y-4">
                <StarRating />
                <p className="text-[15px] font-semibold text-ink">{t.author}</p>
              </div>
            </article>
          ))}
        </div>
      </ReviewsCarousel>
    </section>
  );
}
