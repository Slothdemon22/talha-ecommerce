import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { FlashSaleSection } from "@/components/sections/FlashSaleSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQSection";

export const metadata: Metadata = {
  title: "Fast & Reliable VPS Plans",
  description:
    "Explore WebAiry VPS plans with dependable performance, transparent pricing, and support tailored for growing projects.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fast & Reliable VPS Plans | WebAiry",
    description:
      "Explore WebAiry VPS plans with dependable performance, transparent pricing, and support tailored for growing projects.",
    url: "/",
    siteName: "WebAiry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast & Reliable VPS Plans | WebAiry",
    description:
      "Explore WebAiry VPS plans with dependable performance, transparent pricing, and support tailored for growing projects.",
  },
};

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
