import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingMatrix } from "@/components/sections/PricingMatrix";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <main id="store">
      <HeroSection />
      <PricingMatrix />
      <FeatureGrid />
      <Testimonials />
      <FAQSection />
    </main>
  );
}
