import type { Metadata } from "next";
import AmbassadorCTA from "@/components/ambassador-cta";
import AppPreview from "@/components/app-preview";
import ContentSection from "@/components/content-4";
import ContentSection2 from "@/components/content-7";
import FAQsThree from "@/components/faqs-3";
import Features from "@/components/features-4";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";

export const metadata: Metadata = {
  title: "Roscas – The Free Savings Circle App for Paluwagan, Ajo, Esusu & Chama",
  description:
    "Keep your circle, lose the spreadsheet. Roscas is the free savings circle app for Paluwagan, Ajo, Esusu, Pardna and Chama groups — track contributions and payouts with your whole circle, always free.",
  openGraph: {
    title: "Roscas – The Free Savings Circle App",
    description:
      "Keep your circle, lose the spreadsheet. The free app for Paluwagan, Ajo, Esusu, Pardna and Chama savings circles — clean, transparent tracking for the group you already have.",
  },
};

export default function Home() {
  return (
      <div>
      <HeroSection />
      <Features />
      <AppPreview />
      <ContentSection />
      <ContentSection2 />
      <AmbassadorCTA />
      <FAQsThree />
      <FooterSection />
      </div>
  );
}
