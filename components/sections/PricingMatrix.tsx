import { Button } from "@/components/ui/Button";
import { vpsPlans } from "@/lib/plans";

export function PricingMatrix() {
  return (
    <section
      id="pricing"
      className="bg-canvas-parchment px-6 py-16 sm:py-20 lg:px-8 lg:py-[80px] border-t border-hairline"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {vpsPlans.map((plan) => (
            <article
              key={plan.id}
              className="flex flex-col rounded-lg border border-hairline bg-canvas p-6 transition-premium hover:border-primary/30 hover:shadow-sm"
            >
              <header className="mb-5 border-b border-divider-soft pb-5">
                <h3 className="font-display text-tagline text-ink">{plan.name}</h3>
                <div className="mt-4 flex flex-wrap items-baseline gap-2">
                  <span className="text-[14px] text-ink-muted-48 line-through">
                    ${plan.originalPrice.toFixed(2)} USD
                  </span>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-[12px] font-semibold text-emerald-700">
                    Save {plan.savePercent}%
                  </span>
                </div>
                <p className="mt-3 font-display text-[36px] font-semibold leading-none tracking-tight text-ink">
                  ${plan.price.toFixed(2)}{" "}
                  <span className="text-[15px] font-normal text-ink-muted-80">
                    USD Monthly
                  </span>
                </p>
              </header>

              <p className="mb-6 flex-1 text-[13px] leading-[1.6] text-ink-muted-80">
                {plan.specs}
              </p>

              <Button
                variant="primary"
                href={`/checkout?plan=${plan.id}`}
                className="w-full justify-center"
              >
                Order Now
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
