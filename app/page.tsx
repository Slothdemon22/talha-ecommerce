import { ContactSection } from "@/components/sections/ContactSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { FlashSaleSection } from "@/components/sections/FlashSaleSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <main id="store">
      <HeroSection />
      <FlashSaleSection />
      <FeatureGrid />
      <Testimonials />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
